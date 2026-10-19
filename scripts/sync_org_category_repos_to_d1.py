#!/usr/bin/env python3
"""
Syncs all historical articles (> 60 days) from GitHub Organization Category Repositories
(TheMuslimPost, TMPnews-hindi, TMPnews-urdu) into Cloudflare D1.

Features:
- Preserves raw .md files in GitHub (never deletes)
- Ingests all older articles into Cloudflare D1 edge database
- Uses thread pool for high-speed parallel ingestion
"""

import os
import sys
import json
import re
import urllib.request
import urllib.error
from datetime import datetime, timezone, timedelta
from concurrent.futures import ThreadPoolExecutor, as_completed

FRONTMATTER_REGEX = re.compile(r'^---\s*\n(.*?)\n---\s*\n(.*)$', re.DOTALL)

def parse_simple_yaml(yaml_text):
    data = {}
    lines = yaml_text.splitlines()
    i = 0
    while i < len(lines):
        line = lines[i]
        if not line or line.strip().startswith('#'):
            i += 1
            continue
        match = re.match(r'^([a-zA-Z0-9_\-]+)\s*:\s*(.*)$', line)
        if match:
            key, val = match.groups()
            key = key.strip()
            val = val.strip()
            if val.startswith('[') and val.endswith(']'):
                items = [x.strip().strip('"\'') for x in val[1:-1].split(',') if x.strip()]
                data[key] = items
            elif (val.startswith('"') and val.endswith('"')) or (val.startswith("'") and val.endswith("'")):
                data[key] = val[1:-1]
            elif val == '':
                items = []
                j = i + 1
                while j < len(lines) and re.match(r'^\s*-\s+(.*)$', lines[j]):
                    item_val = re.match(r'^\s*-\s+(.*)$', lines[j]).group(1).strip().strip('"\'')
                    items.append(item_val)
                    j += 1
                if items:
                    data[key] = items
                    i = j - 1
                else:
                    data[key] = ''
            else:
                data[key] = val
        i += 1
    return data

def parse_article_content(raw_text):
    match = FRONTMATTER_REGEX.match(raw_text)
    if not match:
        return {}, raw_text
    fm_raw, body = match.groups()
    return parse_simple_yaml(fm_raw), body.strip()

def execute_d1_query(account_id, token, database_id, sql, params=None):
    url = f"https://api.cloudflare.com/client/v4/accounts/{account_id}/d1/database/{database_id}/query"
    payload = {"sql": sql}
    if params:
        payload["params"] = params

    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode('utf-8'),
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        },
        method="POST"
    )
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode('utf-8'))

def process_single_article(org, repo_name, file_path, headers_gh, cutoff_date, lang):
    fname = file_path.split('/')[-1]
    m = re.match(r'^(\d{4}-\d{2}-\d{2})-(.*)\.md$', fname)
    if not m:
        return None

    file_date, default_slug = m.groups()
    if file_date >= cutoff_date:
        return None # Newer post, skip

    # Fetch raw content
    raw_url = f"https://raw.githubusercontent.com/{org}/{repo_name}/main/{file_path}"
    req = urllib.request.Request(raw_url, headers=headers_gh)
    try:
        with urllib.request.urlopen(req) as resp:
            content = resp.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"Error fetching {raw_url}: {e}", file=sys.stderr)
        return None

    meta, body = parse_article_content(content)
    slug = meta.get("slug") or default_slug
    title = meta.get("title") or default_slug.replace("-", " ").title()
    subheadline = meta.get("subheadline") or meta.get("description") or ""
    author = meta.get("author") or meta.get("writer") or "TMP Staff"

    category_slug = repo_name.replace("tmp-articles-", "")
    categories = meta.get("categories") or meta.get("category") or category_slug
    if isinstance(categories, list):
        category = categories[0] if categories else category_slug
    else:
        category = str(categories)

    image = meta.get("image") or ""
    image_desc = meta.get("image_description") or ""
    tags = meta.get("tags") or [category]
    tags_json = json.dumps(tags if isinstance(tags, list) else [tags], ensure_ascii=False)

    pub_date = meta.get("date") or file_date
    date_str = str(pub_date)

    return [
        slug, title, subheadline, author, category,
        date_str, image, image_desc, tags_json, body, lang
    ]

def sync_org(org, lang, database_id, account_id, cf_token, gh_pat, days=60):
    cutoff_date = (datetime.now(timezone.utc) - timedelta(days=days)).strftime("%Y-%m-%d")
    headers_gh = {'Authorization': f'Bearer {gh_pat}', 'User-Agent': 'TMP-Archiver'}

    print(f"\n==========================================")
    print(f"Syncing Org: {org} -> D1 ({database_id})")
    print(f"Cutoff Date (> {days} Days Old): < {cutoff_date}")
    print(f"==========================================")

    # 1. List repos
    req = urllib.request.Request(f"https://api.github.com/orgs/{org}/repos?per_page=100", headers=headers_gh)
    with urllib.request.urlopen(req) as resp:
        repos_data = json.loads(resp.read().decode('utf-8'))

    article_repos = [r['name'] for r in repos_data if r['name'].startswith('tmp-articles-')]
    print(f"Found {len(article_repos)} category repositories.")

    # 2. Collect older file tasks
    tasks = []
    for rname in article_repos:
        try:
            tree_url = f"https://api.github.com/repos/{org}/{rname}/git/trees/main?recursive=1"
            req_tree = urllib.request.Request(tree_url, headers=headers_gh)
            with urllib.request.urlopen(req_tree) as resp:
                tdata = json.loads(resp.read().decode('utf-8'))
            for item in tdata.get('tree', []):
                p = item['path']
                if p.endswith('.md') and 'posts' in p:
                    tasks.append((org, rname, p, headers_gh, cutoff_date, lang))
        except Exception as e:
            print(f"Warning: tree error on {rname}: {e}")

    print(f"Found {len(tasks)} total markdown articles in {org}. Filtering older than {cutoff_date}...")

    # 3. Fetch in parallel
    older_articles = []
    with ThreadPoolExecutor(max_workers=12) as executor:
        futures = [executor.submit(process_single_article, *t) for t in tasks]
        for f in as_completed(futures):
            res = f.result()
            if res:
                older_articles.append(res)

    print(f"Found {len(older_articles)} articles older than {days} days to ingest into D1.")

    # 4. Ingest into Cloudflare D1
    upsert_sql = """
    INSERT INTO articles (slug, title, subheadline, author, category, date, image, image_description, tags, content, language)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(slug) DO UPDATE SET
        title=excluded.title,
        subheadline=excluded.subheadline,
        author=excluded.author,
        category=excluded.category,
        date=excluded.date,
        image=excluded.image,
        image_description=excluded.image_description,
        tags=excluded.tags,
        content=excluded.content,
        language=excluded.language;
    """

    ingested = 0
    batch_size = 20
    for i in range(0, len(older_articles), batch_size):
        chunk = older_articles[i:i + batch_size]
        for item in chunk:
            try:
                execute_d1_query(account_id, cf_token, database_id, upsert_sql, item)
                ingested += 1
            except Exception as e:
                print(f"Error inserting {item[0]}: {e}", file=sys.stderr)
        print(f"Progress: {ingested}/{len(older_articles)} articles ingested to D1...")

    print(f"Completed {org}: {ingested} articles saved to Cloudflare D1!")

def main():
    account_id = "81e48888678bf5f5a99fbe2e42050e8a"
    cf_token = os.getenv("CLOUDFLARE_API_TOKEN", "")
    gh_pat = os.getenv("GITHUB_PAT", "")

    dbs = [
        ("TheMuslimPost", "en", "4f7db06b-6924-4566-96dd-1bc42ec9cb32"),
        ("TMPnews-hindi", "hi", "007da8a4-cd45-4445-a43b-896baef4ab1b"),
        ("TMPnews-urdu", "ur", "401a2479-db9b-4a79-a98f-593b71cbf843")
    ]

    for org, lang, db_id in dbs:
        sync_org(org, lang, db_id, account_id, cf_token, gh_pat, days=60)

if __name__ == "__main__":
    main()

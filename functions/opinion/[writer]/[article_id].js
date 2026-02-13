export async function onRequest(context) {
  const { env, params, request } = context;
  const url = new URL(request.url);
  const siteBase = url.origin; 
  const db = env.DB_1;

  // --- 1. ROBUST ID EXTRACTION ---
  let writer = params.writer;
  let article_id = params.article_id || params.slug || params.id;

  if (!article_id || !writer) {
      const pathSegments = url.pathname.split('/').filter(s => s.length > 0);
      if (pathSegments.length >= 3) {
          writer = pathSegments[1];
          article_id = pathSegments[2];
      }
  }

  if (!article_id) {
    return new Response(`Error: Could not determine Article ID from URL.`, { status: 400 });
  }

  // --- 2. FETCH CURRENT ARTICLE ---
  let post = null;
  try {
    const { results } = await db.prepare("SELECT * FROM articles WHERE id = ?").bind(article_id).all();
    if (results && results.length > 0) post = results[0];
  } catch (e) { return new Response(`Database Error: ${e.message}`, { status: 500 }); }

  if (!post) return new Response("<h1>Article Not Found</h1>", { status: 404, headers: { "Content-Type": "text/html" } });

  const dateStr = new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  // --- 3. FETCH WRITER PROFILE ---
  let writerProfile = null;
  let badgeHtml = '';
  try {
    const jsonRes = await fetch(`${siteBase}/assets/data/writers_db.json`);
    if (jsonRes.ok) {
      const writers = await jsonRes.json();
      writerProfile = writers.find(w => w.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') === writer);
    }
  } catch (e) {}

  // Badge Logic
  const badge = writerProfile ? writerProfile.badge : null;
  let isStaff = false;
  
  const badges = {
    'staff-gold': { icon: 'text-yellow-500', title: 'Official Staff' },
    'staff-red': { icon: 'text-red-600', title: 'Opinion Desk' },
    'expert-blue': { icon: 'text-blue-600', title: 'Expert' },
    'gov-silver': { icon: 'text-gray-400', title: 'Government' },
    'religious-green': { icon: 'text-emerald-600', title: 'Scholar' },
    'doctor-black': { icon: 'text-gray-900', title: 'Medical Doctor' }
  };

  if (badges[badge]) {
      badgeHtml = `<i class="fas fa-check-circle ${badges[badge].icon} text-sm ml-1" title="${badges[badge].title}"></i>`;
      if (badge.includes('staff')) isStaff = true;
  } else {
      badgeHtml = `<i class="fas fa-check-circle text-emerald-500 text-sm ml-1" title="Verified Writer"></i>`;
  }

  // --- 4. DISCLAIMER LOGIC ---
  const disclaimer = !isStaff ? `
    <div class="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-100 text-center">
        <p class="italic text-gray-500 text-sm font-inter leading-relaxed">
            "The views expressed in this article are the author’s own and do not necessarily reflect TMPnews (The Muslim Post) editorial stance."
        </p>
    </div>
  ` : '';

  // --- 5. SMART RELATED ARTICLES LOGIC ---
  let relatedHtml = '';
  try {
      // Step A: Extract Keywords from Title (Remove stop words)
      const stopWords = ['the', 'is', 'at', 'which', 'on', 'in', 'a', 'an', 'and', 'or', 'of', 'to', 'for', 'with'];
      const keywords = post.title.toLowerCase().split(/\s+/).filter(w => w.length > 3 && !stopWords.includes(w));
      
      let relatedPosts = [];
      
      // Step B: Try to find articles with matching keywords in title
      if (keywords.length > 0) {
          // Construct a dynamic query: title LIKE %keyword1% OR title LIKE %keyword2%
          const conditions = keywords.map(() => "title LIKE ?").join(" OR ");
          const bindParams = keywords.map(k => `%${k}%`);
          
          // Add current article ID to exclude it
          bindParams.push(article_id);

          const query = `SELECT * FROM articles WHERE (${conditions}) AND id != ? ORDER BY date DESC LIMIT 5`;
          const { results } = await db.prepare(query).bind(...bindParams).all();
          relatedPosts = results || [];
      }

      // Step C: Fallback - If less than 5 results, fill with latest articles
      if (relatedPosts.length < 5) {
          const limit = 5 - relatedPosts.length;
          // Get IDs to exclude (current + ones we already found)
          const excludeIds = [article_id, ...relatedPosts.map(p => p.id)];
          // Create placeholders for exclusion: ?, ?, ?
          const placeholders = excludeIds.map(() => '?').join(',');

          const { results: fallbackPosts } = await db.prepare(
              `SELECT * FROM articles WHERE id NOT IN (${placeholders}) ORDER BY date DESC LIMIT ?`
          ).bind(...excludeIds, limit).all();

          if (fallbackPosts) relatedPosts = [...relatedPosts, ...fallbackPosts];
      }

      // Step D: Render HTML
      if (relatedPosts.length > 0) {
          const cards = relatedPosts.map(p => {
              // We need to guess the writer slug from the author name if strictly needed, 
              // or just link to a generic reader if preferred. 
              // For now, we attempt to slugify the author name.
              const pWriterSlug = p.author.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
              const pLink = `/opinion/${pWriterSlug}/${p.id}`;
              const pDate = new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

              return `
                <a href="${pLink}" class="group block border-b border-gray-100 last:border-0 py-4">
                    <div class="flex gap-4 items-start">
                         <div class="flex-grow">
                             <h4 class="font-bold text-gray-900 text-lg leading-snug group-hover:text-blue-600 transition-colors font-merriweather mb-2">
                                ${p.title}
                             </h4>
                             <div class="flex items-center gap-2 text-xs text-gray-500 font-inter uppercase tracking-wide">
                                <span class="text-blue-600 font-semibold">${p.author}</span>
                                <span>•</span>
                                <span>${pDate}</span>
                             </div>
                         </div>
                         ${p.image ? `
                         <div class="w-24 h-24 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                            <img src="${p.image}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
                         </div>` : ''}
                    </div>
                </a>
              `;
          }).join('');
          
          relatedHtml = `
            <div class="mt-12">
                <hr class="border-gray-200 mb-8">
                
                <div class="flex items-center gap-2 mb-6">
                    <h3 class="text-2xl font-bold text-gray-900 font-inter">Related</h3>
                    <span class="w-2 h-2 rounded-full bg-blue-600 mt-1"></span>
                </div>

                <div class="flex flex-col">
                    ${cards}
                </div>
            </div>
          `;
      }
  } catch (err) { console.warn("Related fetch error:", err); }

  // --- 6. GENERATE HTML ---
  const articleHtml = `
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&family=Inter:wght@400;500;600&display=swap');
        .font-merriweather { font-family: 'Merriweather', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        
        .article-headline { font-family: 'Merriweather', serif; font-weight: 900; font-size: 3rem; line-height: 1.2; color: #111827; margin-bottom: 0.5rem; }
        .article-subheadline { font-family: 'Inter', sans-serif; font-size: 1.125rem; color: #4b5563; line-height: 1.6; margin-bottom: 1.5rem; }
        .article-body { font-family: 'Merriweather', serif; font-size: 1.125rem; line-height: 1.8; color: #374151; }
        .article-body p { margin-bottom: 1.5rem; }
        .article-body h2 { font-weight: 700; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem; color: #111827; }
        .article-figure { margin: 2rem 0; }
        .article-figure img { width: 100%; height: auto; border-radius: 0.5rem; }
        .article-caption { font-family: 'Inter', sans-serif; font-size: 0.875rem; color: #6b7280; text-align: center; margin-top: 0.5rem; }
        @media (max-width: 768px) { .article-headline { font-size: 2rem; } }
    </style>

    <div class="max-w-3xl mx-auto px-4 py-12">
        <header class="mb-8 border-b pb-8">
            ${post.tags ? `<div class="flex gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-red-600">${post.tags.split(',').map(t=>`<span>${t}</span>`).join('')}</div>` : ''}
            <h1 class="article-headline">${post.title}</h1>
            ${post.subheadline ? `<p class="article-subheadline">${post.subheadline}</p>` : ''}

            <div class="flex items-center justify-between mt-6">
                <div class="flex items-center gap-3">
                    <a href="/opinion/${writer}" class="flex items-center gap-2 group">
                        ${writerProfile && writerProfile.image ? `<img src="${writerProfile.image}" class="w-10 h-10 rounded-full object-cover border border-gray-200">` : `<div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500"><i class="fas fa-user"></i></div>`}
                        <div>
                            <div class="font-bold text-gray-900 group-hover:text-blue-600 transition-colors flex items-center">
                                ${post.author} ${badgeHtml}
                            </div>
                            <div class="text-sm text-gray-500">${dateStr}</div>
                        </div>
                    </a>
                </div>
                
                <button id="dynamic-share-btn" class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors" title="Share">
                    <i class="fas fa-share-alt"></i>
                </button>
            </div>
        </header>

        <div class="article-body">
            ${post.image ? `
            <figure class="article-figure">
                <img src="${post.image}" alt="${post.title}">
                ${post.image_description ? `<figcaption class="article-caption">${post.image_description}</figcaption>` : ''}
            </figure>` : ''}

            ${post.content.replace(/\n/g, '<br>')}
        </div>

        ${disclaimer}

        ${relatedHtml}
    </div>

    <script>
    document.addEventListener('DOMContentLoaded', () => {
        const btn = document.getElementById('dynamic-share-btn');
        if(btn) {
            btn.addEventListener('click', async () => {
                const url = window.location.href;
                const title = "${post.title.replace(/"/g, '\\"')}"; 
                if (navigator.share) { try { await navigator.share({ title: title, url: url }); return; } catch (e) {} }
                try { await navigator.clipboard.writeText(url); showSuccess(); } catch (err) {
                   const ta = document.createElement("textarea"); ta.value = url; ta.style.position="fixed"; ta.style.left="-9999px";
                   document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); showSuccess(); } catch(e) { alert('URL: ' + url); }
                   document.body.removeChild(ta);
                }
                function showSuccess() { const og = btn.innerHTML; btn.innerHTML = '<i class="fas fa-check text-green-600"></i>'; setTimeout(() => btn.innerHTML = og, 2000); }
            });
        }
    });
    </script>
  `;

  // --- 7. INJECT INTO SHELL ---
  try {
    const templateRes = await fetch(`${siteBase}/dynamic-template.html`);
    if (templateRes.ok) {
        let templateHtml = await templateRes.text();
        templateHtml = templateHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${post.title} | TMP News</title>`);
        templateHtml = templateHtml.replace('REPLACE_ME_CONTENT', articleHtml);
        templateHtml = templateHtml.replace(/<div[^>]*id="dynamic-title-holder"[^>]*>.*?<\/div>/i, '');
        return new Response(templateHtml, { headers: { "Content-Type": "text/html" } });
    }
  } catch (err) { console.error("Template fetch failed:", err); }

  return new Response(articleHtml, { headers: { "Content-Type": "text/html" } });
}
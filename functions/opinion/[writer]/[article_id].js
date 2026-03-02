export async function onRequest(context) {
  const { env, params, request } = context;
  const url = new URL(request.url);
  const siteBase = url.origin; 
  const db = env.DB_1;

  // --- 0. CACHE CONFIGURATION ---
  const CACHE_HEADERS = {
      "Content-Type": "text/html",
      "Cache-Control": "public, max-age=300, s-maxage=3600"
  };

  // --- 1. ROBUST ID EXTRACTION (UPDATED FOR SEO SLUGS) ---
  let writer = params.writer;
  
  // Look for ?id= first, then fall back to the path parameters
  let article_id = url.searchParams.get('id') || params.article_id || params.slug || params.id;

  if (!article_id || !writer) {
      const pathSegments = url.pathname.split('/').filter(s => s.length > 0);
      if (pathSegments.length >= 3) {
          writer = pathSegments[1];
          article_id = url.searchParams.get('id') || pathSegments[2];
      }
  }

  if (!article_id) return new Response(`Error: Missing Article ID`, { status: 400 });

  // --- 2. PREPARE DATA PROMISES (PARALLEL EXECUTION) ---
  const postPromise = db.prepare("SELECT * FROM articles WHERE slug = ?").bind(article_id).first();
  const writersPromise = fetchWithCache(`${siteBase}/assets/data/writers_db.json`, context);
  const templatePromise = fetchWithCache(`${siteBase}/dynamic-template.html`, context);

  // --- 3. AWAIT ALL DATA ---
  const [post, writersData, templateHtmlRaw] = await Promise.all([postPromise, writersPromise, templatePromise]);

  if (!post) return new Response("<h1>Article Not Found</h1>", { status: 404, headers: { "Content-Type": "text/html" } });

  // --- 4. PROCESS DATA ---
  const dateStr = new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  // Clean Author Name (Strip "By ")
  const cleanAuthor = post.author ? post.author.replace(/^By\s+/i, '').trim() : 'Staff';
  const authorSlug = cleanAuthor.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  // Find Writer Profile
  let writerProfile = null;
  if (writersData) {
      writerProfile = writersData.find(w => w.name === cleanAuthor || w.id === authorSlug);
  }

  // Badge Logic
  const badge = writerProfile ? writerProfile.badge : null;
  let badgeHtml = `<i class="fas fa-check-circle text-emerald-500 text-sm ml-1" title="Verified Writer"></i>`;
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
  }

  const disclaimer = !isStaff ? `
    <div class="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-100 text-center">
        <p class="italic text-gray-500 text-sm font-inter leading-relaxed">
            "The views expressed in this article are the author’s own and do not necessarily reflect TMPnews."
        </p>
    </div>
  ` : '';

  // --- 5. RELATED ARTICLES (UPDATED LINKS) ---
  let relatedHtml = '';
  try {
      const { results: relatedPosts } = await db.prepare(
          `SELECT id, title, author, date, image FROM articles WHERE id != ? ORDER BY date DESC LIMIT 5`
      ).bind(article_id).all();

      if (relatedPosts && relatedPosts.length > 0) {
          const cards = relatedPosts.map(p => {
              const pCleanAuthor = p.author ? p.author.replace(/^By\s+/i, '').trim() : 'Staff';
              const pWriterSlug = pCleanAuthor.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
              const pTitleSlug = p.title ? p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : 'article';
              
              return `
                  <a href="/opinion/${pWriterSlug}/${pTitleSlug}" class="group block border-b border-gray-100 last:border-0 py-4">
                    <div class="flex gap-4 items-start">
                         <div class="flex-grow">
                             <h4 class="font-bold text-gray-900 text-lg leading-snug group-hover:text-blue-600 transition-colors font-merriweather mb-2">
                                ${p.title}
                             </h4>
                             <div class="flex items-center gap-2 text-xs text-gray-500 font-inter uppercase tracking-wide">
                                <span class="text-blue-600 font-semibold">${pCleanAuthor}</span>
                             </div>
                         </div>
                         ${p.image ? `<div class="w-24 h-24 shrink-0 overflow-hidden rounded-lg bg-gray-100"><img src="${p.image}" class="w-full h-full object-cover" loading="lazy"></div>` : ''}
                    </div>
                </a>`;
          }).join('');
          
          relatedHtml = `<div class="mt-12"><hr class="border-gray-200 mb-8"><h3 class="text-2xl font-bold text-gray-900 font-inter mb-6">Read Next</h3><div class="flex flex-col">${cards}</div></div>`;
      }
  } catch (err) { console.warn("Related fetch error:", err); }

  // --- 6. GENERATE HTML ---
  const articleHtml = `
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&family=Inter:wght@400;500;600&display=swap');
        .font-merriweather { font-family: 'Merriweather', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .article-headline { font-family: 'Merriweather', serif; font-weight: 900; font-size: 2.5rem; line-height: 1.2; color: #111827; margin-bottom: 0.5rem; }
        .article-body { font-family: 'Merriweather', serif; font-size: 1.125rem; line-height: 1.8; color: #374151; }
        .article-body p { margin-bottom: 1.5rem; }
        .article-body h2 { font-weight: 700; font-size: 1.5rem; margin-top: 2rem; }
        .article-figure img { width: 100%; height: auto; border-radius: 0.5rem; }
        @media (max-width: 768px) { .article-headline { font-size: 1.8rem; } }
    </style>

    <div class="max-w-3xl mx-auto px-4 py-12">
        <header class="mb-8 border-b pb-8">
            ${post.tags ? `<div class="flex gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-red-600">${JSON.parse(post.tags || '[]').map(t=>`<span>${t}</span>`).join('')}</div>` : ''}
            <h1 class="article-headline">${post.title}</h1>
            ${post.subheadline ? `<p class="text-lg text-gray-600 leading-relaxed mb-6">${post.subheadline}</p>` : ''}
            
            <div class="flex items-center gap-3">
                 <a href="/opinion/${authorSlug}">
                    ${writerProfile && writerProfile.image ? `<img src="${writerProfile.image}" class="w-10 h-10 rounded-full object-cover">` : `<div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"><i class="fas fa-user text-gray-500"></i></div>`}
                 </a>
                 <div>
                    <div class="font-bold text-gray-900"><a href="/opinion/${authorSlug}" class="hover:underline">${cleanAuthor}</a> ${badgeHtml}</div>
                    <div class="text-sm text-gray-500">${dateStr}</div>
                 </div>
            </div>
        </header>

        <div class="article-body">
            ${post.image ? `<figure class="my-8"><img src="${post.image}" alt="${post.title}"></figure>` : ''}
            ${post.content.replace(/\n/g, '<br>')}
        </div>
        ${disclaimer}
        ${relatedHtml}
    </div>
  `;

  // --- 7. INJECT INTO TEMPLATE ---
  if (templateHtmlRaw) {
      let finalHtml = templateHtmlRaw.replace(/<title>[\s\S]*?<\/title>/i, `<title>${post.title} | TMP News</title>`);
      finalHtml = finalHtml.replace('REPLACE_ME_CONTENT', articleHtml);
      finalHtml = finalHtml.replace(/<div[^>]*id="dynamic-title-holder"[^>]*>.*?<\/div>/i, '');
      return new Response(finalHtml, { headers: CACHE_HEADERS });
  }

  return new Response(articleHtml, { headers: CACHE_HEADERS });
}

async function fetchWithCache(url, context) {
    const cache = caches.default;
    const cacheKey = new Request(url);
    let response = await cache.match(cacheKey);
    if (!response) {
        try {
            response = await fetch(url);
            if (response.ok) {
                context.waitUntil(cache.put(cacheKey, response.clone()));
            }
        } catch (e) {
            return null;
        }
    }
    if (url.endsWith('.json')) return await response.json();
    return await response.text();
}
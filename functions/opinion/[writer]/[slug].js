export async function onRequest(context) {
  const { env, params } = context;
  const { slug, writer } = params; // Extract variables from URL

  // 1. SEARCH D1 FOR THE ARTICLE
  const dbs = [env.DB_1, env.DB_2, env.DB_3, env.DB_4, env.DB_5, env.DB_6, env.DB_7, env.DB_8];
  let article = null;

  for (const db of dbs) {
    if (!db) continue;
    try {
      article = await db.prepare("SELECT * FROM articles WHERE slug = ?").bind(slug).first();
      if (article) break;
    } catch (e) { console.error("DB Error", e); }
  }

  // 2. HANDLE 404 (Not Found)
  if (!article) {
    return new Response(render404(), { 
      status: 404, 
      headers: { "Content-Type": "text/html" } 
    });
  }

  // 3. PARSE TAGS
  let tagHtml = '';
  try {
    const tags = JSON.parse(article.tags || '[]');
    tags.forEach(tag => {
      tagHtml += `<span class="tag">${tag}</span>`;
    });
  } catch (e) {}

  // 4. GENERATE HTML (Server Side Rendering)
  // We inject the D1 data directly into the HTML string
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${article.title} - The Muslim Post</title>
    
    <meta property="og:title" content="${article.title}">
    <meta property="og:description" content="${article.subheadline || 'Read this article on The Muslim Post'}">
    <meta property="og:image" content="${article.image || ''}">
    <meta property="og:url" content="https://tmpnews.com/opinion/${writer}/${slug}">
    <meta name="twitter:card" content="summary_large_image">

    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&family=Inter:wght@400;500;600&display=swap');
        .article-container { max-width: 1000px; margin: 0 auto; padding: 0.5rem 1rem 2rem 1rem; color: #111827; }
        .article-headline { font-family: 'Merriweather', serif; font-weight: 900; font-size: 56px; line-height: 1.2; margin-bottom: 0.75rem; }
        .article-subheadline { font-family: 'Inter', sans-serif; font-size: 18px; color: #4b5563; line-height: 1.6; margin-bottom: 1.5rem; }
        .article-body p { font-family: 'Merriweather', serif; font-size: 18px; line-height: 1.8; margin-bottom: 1.5rem; }
        .article-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid #e5e7eb; }
        .share-btn { width: 36px; height: 36px; border-radius: 50%; background-color: #f3f4f6; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .tag { background: rgba(220, 38, 38, 0.1); color: #dc2626; padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.75rem; font-weight: 500; text-transform: uppercase; margin-right: 0.5rem; }
        .article-figure img { width: 100%; border-radius: 8px; margin-bottom: 0.5rem; }
        .article-image-caption { text-align: center; color: #6b7280; font-size: 0.875rem; font-style: italic; margin-bottom: 2rem; }
        
        /* Rich Text Support */
        .article-body h2 { font-size: 1.8rem; font-weight: 700; margin-top: 2rem; font-family: 'Merriweather', serif; }
        .article-body blockquote { border-left: 4px solid #1d4ed8; padding-left: 1rem; font-style: italic; color: #555; margin: 2rem 0; }
        .article-body img { max-width: 100%; border-radius: 8px; margin: 1rem 0; }
        .article-body a { color: #1d4ed8; text-decoration: underline; }
        
        @media (max-width: 768px) { .article-headline { font-size: 32px; } .article-subheadline { font-size: 18px; } }
    </style>
</head>
<body class="bg-white">

    <div class="border-b mb-4"><div class="container mx-auto p-4 font-bold text-xl"><a href="/">TMP News</a></div></div>

    <div class="article-container fade-in">
        <article>
            <header>
                <div class="article-tags mb-3">${tagHtml}</div>
                
                <h1 class="article-headline">${article.title}</h1>
                
                ${article.subheadline ? `<div class="article-subheadline">${article.subheadline}</div>` : ''}
                
                <div class="article-meta">
                    <div>
                        <div class="author-name">
                            By <span class="text-gray-900 font-medium">${article.author || 'TMP Staff'}</span>
                        </div>
                        <div class="publish-date text-gray-500 text-sm">
                            ${new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                    </div>
                    <div>
                        <button onclick="navigator.share({title: document.title, url: window.location.href})" class="share-btn" title="Share article"><i class="fas fa-share-alt"></i></button>
                    </div>
                </div>
            </header>

            <div class="article-body">
                ${article.image ? `
                <figure class="article-figure">
                    <img src="${article.image}" alt="Article Image">
                    ${article.image_description ? `<figcaption class="article-image-caption">${article.image_description}</figcaption>` : ''}
                </figure>
                ` : ''}
                
                <div id="content-area">
                    ${article.content}
                </div>
            </div> 
        </article> 
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
           if (window.twttr) window.twttr.widgets.load();
        });
    </script>
    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</body>
</html>
  `;

  return new Response(html, {
    headers: { "Content-Type": "text/html" }
  });
}

// Helper for 404 Page
function render404() {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head><title>Page Not Found</title><script src="https://cdn.tailwindcss.com"></script></head>
    <body class="flex flex-col items-center justify-center h-screen bg-gray-50 text-center">
        <h1 class="text-6xl font-bold text-gray-300">404</h1>
        <p class="text-xl text-gray-600 mt-4">Article not found.</p>
        <a href="/" class="mt-6 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Go Home</a>
    </body>
    </html>
  `;
}
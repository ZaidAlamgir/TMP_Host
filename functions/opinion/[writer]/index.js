export async function onRequest(context) {
  const { env, params, request } = context;
  const { writer } = params;
  const url = new URL(request.url);
  const siteBase = url.origin; 
  
  // 1. GET WRITER PROFILE
  let writerProfile = null;
  try {
    const jsonRes = await fetch(`${siteBase}/assets/data/writers_db.json`);
    if (jsonRes.ok) {
      const writers = await jsonRes.json();
      writerProfile = writers.find(w => {
         // Create slug from JSON name: "Dr. Farhan Qureshi" -> "dr-farhan-qureshi"
         const wSlug = w.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
         return wSlug === writer;
      });
    }
  } catch (e) { console.warn("JSON Fetch Error", e); }

  // Set Defaults
  const authorName = writerProfile ? writerProfile.name : writer.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const avatarUrl = writerProfile ? writerProfile.image : "/assets/img/default-avatar.png";
  const bio = writerProfile ? writerProfile.bio : "Contributing writer for The Muslim Post Community.";
  const role = writerProfile ? writerProfile.role : "Community Writer";
  const designation = writerProfile ? writerProfile.designation : null;
  const degree = writerProfile ? writerProfile.degree : null;
  const badge = writerProfile ? writerProfile.badge : null;

  // Socials
  const email = writerProfile ? writerProfile.email : null;
  const xUrl = writerProfile ? writerProfile.x : null;
  const upscrolledUrl = writerProfile ? writerProfile.upscrolled : null;

  // 2. FETCH ARTICLES
  const db = env.DB_1; 
  const { results } = await db.prepare(
    "SELECT * FROM articles WHERE lower(author) LIKE ? ORDER BY date DESC"
  ).bind(`%${authorName.toLowerCase()}%`).all();

  // 3. GENERATE POSTS HTML
  const postsHtml = (results && results.length > 0) ? results.map(post => {
    const slug = post.id;
    const postLink = `/opinion/${writer}/${slug}`;
    const dateStr = new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    return `
    <article class="flex flex-col md:flex-row gap-6 hover:bg-gray-50 p-4 rounded-xl transition-colors duration-200 group">
        ${post.image ? `
        <div class="md:w-1/3 shrink-0 overflow-hidden rounded-lg">
            <a href="${postLink}">
                <img src="${post.image}" alt="${post.title}" class="w-full h-48 object-cover rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-500">
            </a>
        </div>` : ''}
        
        <div class="flex flex-col justify-center">
            <div class="text-sm text-gray-500 mb-2 font-medium">
                ${dateStr} • <span class="text-indigo-600 font-semibold">User Opinion</span>
            </div>
            <h2 class="text-xl font-bold text-gray-900 mb-3 leading-tight font-merriweather">
                <a href="${postLink}" class="hover:text-blue-600 hover:underline decoration-2 underline-offset-2">
                    ${post.title}
                </a>
            </h2>
            <p class="text-gray-600 line-clamp-2">
                ${post.subheadline || 'Click to read full article...'}
            </p>
        </div>
    </article>
    `;
  }).join('') : `<p class="text-center text-gray-500 italic">No articles found for this writer.</p>`;

  // 4. DETERMINE COLORS BASED ON BADGE TYPE
  let borderColor = "border-gray-200";
  let tickColor = "text-emerald-500"; // Default Green

  switch (badge) {
      case 'staff-gold':
          borderColor = "border-yellow-500";
          tickColor = "text-yellow-500";
          break;
      case 'staff-red':
          borderColor = "border-red-600";
          tickColor = "text-red-600";
          break;
      case 'expert-blue':
          borderColor = "border-blue-600";
          tickColor = "text-blue-600";
          break;
      case 'gov-silver':
          borderColor = "border-gray-400";
          tickColor = "text-gray-400";
          break;
      case 'religious-green':
          borderColor = "border-emerald-600";
          tickColor = "text-emerald-600";
          break;
      case 'doctor-black':
          borderColor = "border-gray-900";
          tickColor = "text-gray-900";
          break;
  }

  // 5. GENERATE PROFILE FRAGMENT
  const profileHtml = `
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

    <div class="max-w-4xl mx-auto px-4 py-12">
        <div class="flex flex-col items-center text-center mb-12 w-full">
            <div class="mb-5 relative group">
                 <img src="${avatarUrl}" alt="${authorName}" class="relative w-36 h-36 rounded-full object-cover border-[6px] ${borderColor} shadow-xl block mx-auto p-1 bg-white">
            </div>
            
            <div class="flex justify-center w-full mb-1">
                <h1 class="inline-flex flex-wrap justify-center items-center gap-2 text-4xl font-black text-gray-900 font-merriweather">
                    <span>${authorName}</span>
                    <i class="fas fa-check-circle ${tickColor} text-3xl" title="Verified Account"></i>
                </h1>
            </div>

            <div class="flex flex-wrap justify-center gap-3 mb-6 mt-3">
                ${designation ? `<span class="px-3 py-1 bg-gray-50 text-gray-700 text-sm font-bold uppercase tracking-wide rounded-full border border-gray-200 flex items-center gap-2"><i class="fas fa-id-badge text-gray-400"></i> ${designation}</span>` : ''}
                ${degree ? `<span class="px-3 py-1 bg-gray-50 text-gray-700 text-sm font-bold uppercase tracking-wide rounded-full border border-gray-200 flex items-center gap-2"><i class="fas fa-graduation-cap text-gray-400"></i> ${degree}</span>` : ''}
            </div>
            
            ${!designation && role ? `<p class="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-6">${role}</p>` : ''}
            
            <div class="max-w-2xl text-gray-600 text-lg leading-relaxed font-merriweather mx-auto">
                ${bio}
            </div>

            <div class="flex gap-4 mt-8 text-gray-500 items-center justify-center w-full">
                ${email ? `<a href="mailto:${email}" class="hover:text-red-500 transition-colors transform hover:scale-110"><i class="fas fa-envelope fa-xl"></i></a>` : ''}
                ${xUrl ? `<a href="${xUrl}" target="_blank" class="hover:text-black transition-colors transform hover:scale-110"><i class="fa-brands fa-x-twitter fa-xl"></i></a>` : ''}
                ${upscrolledUrl ? `<a href="${upscrolledUrl}" target="_blank" class="hover:text-emerald-600 transition-colors transform hover:scale-110"><i class="fa-solid fa-scroll fa-xl"></i></a>` : ''}
            </div>
        </div>

        <hr class="border-gray-200 my-10">

        <div>
            <h3 class="text-2xl font-bold text-gray-900 mb-8 font-inter border-l-4 border-blue-600 pl-4">
                Articles by ${authorName}
            </h3>
            <div class="grid gap-8">
                ${postsHtml}
            </div>
        </div>
    </div>
  `;

  // 6. FETCH SHELL & INJECT
  try {
    const templateRes = await fetch(`${siteBase}/dynamic-template.html`);
    if (templateRes.ok) {
        let templateHtml = await templateRes.text();
        templateHtml = templateHtml.replace('REPLACE_ME_CONTENT', profileHtml);
        templateHtml = templateHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${authorName} - Writer Profile | TMP News</title>`);
        templateHtml = templateHtml.replace(/<div[^>]*id="dynamic-title-holder"[^>]*>.*?<\/div>/i, '');
        return new Response(templateHtml, { headers: { "Content-Type": "text/html" } });
    }
  } catch (err) { console.error("Template fetch failed:", err); }

  return new Response(profileHtml, { headers: { "Content-Type": "text/html" } });
}
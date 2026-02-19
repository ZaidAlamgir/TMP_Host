export async function onRequest(context) {
  const { env, request } = context;
  const kv = env.FEED_CACHE;
  const db = env.DB_1;

  // Configuration
  const POSTS_PER_PAGE = 50;
  const MAX_CACHED_PAGES = 10; // Max 500 posts in KV (10 pages * 50 posts)
  const CACHE_TIME_MS = 3 * 60 * 1000; // 3 Minutes

  // 1. Get Page Number
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page")) || 1;
  const offset = (page - 1) * POSTS_PER_PAGE;

  try {
    // 2. If page > 10, skip KV and fetch directly from D1 (for old posts)
    if (page > MAX_CACHED_PAGES) {
        const query = `SELECT id, title, subheadline, author, date, image, tags FROM articles WHERE title IS NOT NULL AND title != "" ORDER BY date DESC LIMIT ? OFFSET ?`;
        const { results } = await db.prepare(query).bind(POSTS_PER_PAGE, offset).all();
        return new Response(JSON.stringify({ posts: results || [], page: page, source: "D1_DIRECT" }), {
            headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=60" }
        });
    }

    // 3. For Pages 1 to 10, use KV Cache
    const CACHE_KEY = `feed_page_${page}`;
    let cachedData = await kv.get(CACHE_KEY, { type: "json" });
    let serveStale = false;
    let mustFetch = false;

    const now = Date.now();
    if (!cachedData) {
        mustFetch = true; 
    } else if (now - cachedData.timestamp > CACHE_TIME_MS) {
        serveStale = true; // Serve instantly, refresh background
    }

    // 4. Fetch from D1 if needed
    if (mustFetch) {
        cachedData = await fetchPageAndCache(db, kv, CACHE_KEY, POSTS_PER_PAGE, offset);
    } else if (serveStale) {
        context.waitUntil(fetchPageAndCache(db, kv, CACHE_KEY, POSTS_PER_PAGE, offset));
    }

    // 5. Return Data
    return new Response(JSON.stringify({ 
        posts: cachedData.posts, 
        page: page,
        source: mustFetch ? "D1_FETCH" : "KV_CACHE"
    }), {
      headers: { 
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=30, s-maxage=60"
      }
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

// --- HELPER: Fetch from D1 and Update KV ---
async function fetchPageAndCache(db, kv, key, limit, offset) {
    const query = `SELECT id, title, subheadline, author, date, image, tags FROM articles WHERE title IS NOT NULL AND title != "" ORDER BY date DESC LIMIT ? OFFSET ?`;
    const { results } = await db.prepare(query).bind(limit, offset).all();

    const dataToCache = {
        timestamp: Date.now(),
        posts: results || []
    };

    // Update KV
    await kv.put(key, JSON.stringify(dataToCache));
    return dataToCache;
}
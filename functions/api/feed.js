export async function onRequest(context) {
  const { env, request } = context;
  const kv = env.FEED_CACHE;
  const db = env.DB_1;

  const POSTS_PER_PAGE = 50;
  const MAX_CACHED_PAGES = 10; 
  const CACHE_TIME_MS = 3 * 60 * 1000; 

  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page")) || 1;
  const offset = (page - 1) * POSTS_PER_PAGE;

  try {
    if (page > MAX_CACHED_PAGES) {
        const query = `SELECT id, title, subheadline, author, date, image, tags FROM articles WHERE title IS NOT NULL AND title != "" ORDER BY date DESC LIMIT ? OFFSET ?`;
        const { results } = await db.prepare(query).bind(POSTS_PER_PAGE, offset).all();
        return new Response(JSON.stringify({ posts: results || [], page: page, source: "D1_DIRECT" }), {
            headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=60" }
        });
    }

    const CACHE_KEY = `feed_page_${page}`;
    let cachedData = await kv.get(CACHE_KEY, { type: "json" });
    let serveStale = false;
    let mustFetch = false;

    const now = Date.now();
    if (!cachedData) {
        mustFetch = true; 
    } else if (now - cachedData.timestamp > CACHE_TIME_MS) {
        serveStale = true; 
    }

    if (mustFetch) {
        cachedData = await fetchPageAndCache(db, kv, CACHE_KEY, POSTS_PER_PAGE, offset);
    } else if (serveStale) {
        context.waitUntil(fetchPageAndCache(db, kv, CACHE_KEY, POSTS_PER_PAGE, offset));
    }

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

async function fetchPageAndCache(db, kv, key, limit, offset) {
    const query = `SELECT id, title, subheadline, author, date, image, tags FROM articles WHERE title IS NOT NULL AND title != "" ORDER BY date DESC LIMIT ? OFFSET ?`;
    const { results } = await db.prepare(query).bind(limit, offset).all();

    const dataToCache = {
        timestamp: Date.now(),
        posts: results || []
    };
    await kv.put(key, JSON.stringify(dataToCache));
    return dataToCache;
}
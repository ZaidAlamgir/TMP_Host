export async function onRequest(context) {
  // 1. DEFINE HEADERS (Allow Everyone)
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // 2. HANDLE "OPTIONS" REQUEST (Browser Pre-check)
  if (context.request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // 3. CONFIGURATION
  const FIREBASE_URL = "https://tmp-news-userpost-feed-default-rtdb.asia-southeast1.firebasedatabase.app/live_feed.json";
  const SECRET = context.env.FIREBASE_AUTH_SECRET;

  if (!SECRET) {
    return new Response(JSON.stringify({ error: "Configuration Error" }), { 
      status: 500, 
      headers: { ...corsHeaders, "Content-Type": "application/json" } 
    });
  }

  // 4. CHECK CACHE
  const cacheKey = new Request(context.request.url, context.request);
  const cache = caches.default;
  let response = await cache.match(cacheKey);

  if (response) {
    // Re-add CORS headers to cached response just in case
    const newHeaders = new Headers(response.headers);
    newHeaders.set("Access-Control-Allow-Origin", "*");
    return new Response(response.body, {
      status: response.status,
      headers: newHeaders
    });
  }

  // 5. FETCH FROM FIREBASE
  const authenticatedUrl = `${FIREBASE_URL}?auth=${SECRET}`;
  const fbResponse = await fetch(authenticatedUrl);
  
  if (!fbResponse.ok) {
    return new Response(JSON.stringify({ error: "Firebase Permission Denied" }), { 
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  const data = await fbResponse.json();

  // 6. TRANSFORM DATA
  let postsArray = [];
  if (data) {
    if (Array.isArray(data)) {
        postsArray = data.filter(p => p !== null); 
    } else if (typeof data === 'object') {
        postsArray = Object.values(data); 
    }
  }
  postsArray.sort((a, b) => new Date(b.date) - new Date(a.date));

  // 7. RETURN RESPONSE
  response = new Response(JSON.stringify({ posts: postsArray }), {
    headers: {
      ...corsHeaders, // Add CORS headers here
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=60, s-maxage=300", 
    }
  });

  context.waitUntil(cache.put(cacheKey, response.clone()));

  return response;
}
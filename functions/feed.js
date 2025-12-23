export async function onRequest(context) {
  // 1. The Firebase URL
  const FIREBASE_URL = "https://tmp-news-userpost-feed-default-rtdb.asia-southeast1.firebasedatabase.app/live_feed.json";

  // 2. CHECK CACHE (Cloudflare Cache API)
  // We try to find a saved response before asking Firebase
  const cacheKey = new Request(context.request.url, context.request);
  const cache = caches.default;
  let response = await cache.match(cacheKey);

  if (response) {
    console.log("Serving from Cloudflare Cache");
    return response;
  }

  // 3. IF NO CACHE -> FETCH FROM FIREBASE
  console.log("Cache Miss - Fetching from Firebase...");
  const fbResponse = await fetch(FIREBASE_URL);
  
  if (!fbResponse.ok) {
    // If Rule is still blocking, this error will show up
    return new Response(JSON.stringify({ error: "Firebase Permission Denied" }), { status: 500 });
  }

  const data = await fbResponse.json();

  // 4. TRANSFORM DATA (Dictionary -> Array)
  let postsArray = [];
  if (data) {
    if (Array.isArray(data)) {
        postsArray = data.filter(p => p !== null); 
    } else if (typeof data === 'object') {
        postsArray = Object.values(data); 
    }
  }

  // Sort by Date (Newest First)
  postsArray.sort((a, b) => new Date(b.date) - new Date(a.date));

  // 5. CREATE RESPONSE & SAVE TO CACHE
  const jsonResponse = JSON.stringify({ posts: postsArray });
  
  response = new Response(jsonResponse, {
    headers: {
      "Content-Type": "application/json",
      // CACHE RULES:
      // Browser keeps it for 60 seconds.
      // Cloudflare Server keeps it for 5 minutes (matches your cron logic).
      "Cache-Control": "public, max-age=60, s-maxage=300", 
      "Access-Control-Allow-Origin": "*"
    }
  });

  // Save this response to the Worker Cache for next time
  context.waitUntil(cache.put(cacheKey, response.clone()));

  return response;
}
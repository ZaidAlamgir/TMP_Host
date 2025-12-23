export async function onRequest(context) {
  // 1. CONFIGURATION
  const FIREBASE_URL = "https://tmp-news-userpost-feed-default-rtdb.asia-southeast1.firebasedatabase.app/live_feed.json";
  
  // --- FIX START: Get the Secret Key ---
  const SECRET = context.env.FIREBASE_AUTH_SECRET; 
  if (!SECRET) {
    return new Response(JSON.stringify({ error: "Configuration Error: FIREBASE_AUTH_SECRET is missing in Cloudflare" }), { status: 500 });
  }
  // --- FIX END ---

  // 2. CHECK CACHE (Cloudflare Cache API)
  const cacheKey = new Request(context.request.url, context.request);
  const cache = caches.default;
  let response = await cache.match(cacheKey);

  if (response) {
    console.log("Serving from Cloudflare Cache");
    return response;
  }

  // 3. IF NO CACHE -> FETCH FROM FIREBASE (SECURELY)
  console.log("Cache Miss - Fetching from Firebase...");
  
  // --- FIX START: Use Authenticated URL ---
  const authenticatedUrl = `${FIREBASE_URL}?auth=${SECRET}`;
  const fbResponse = await fetch(authenticatedUrl);
  // --- FIX END ---
  
  if (!fbResponse.ok) {
    // Read the error message from Firebase
    const errText = await fbResponse.text();
    return new Response(JSON.stringify({ error: "Firebase Permission Denied", details: errText }), { status: 500 });
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
      "Cache-Control": "public, max-age=60, s-maxage=300", 
      "Access-Control-Allow-Origin": "*"
    }
  });

  context.waitUntil(cache.put(cacheKey, response.clone()));

  return response;
}
export async function onRequest(context) {
  // 1. The Firebase URL (The one we tested earlier)
  const FIREBASE_URL = "https://tmp-news-userpost-feed-default-rtdb.asia-southeast1.firebasedatabase.app/live_feed.json";

  // 2. Fetch data from Firebase
  const response = await fetch(FIREBASE_URL);
  const data = await response.json();

  // 3. Return the data with Caching Headers
  // s-maxage=60: Cloudflare Cache holds it for 60 seconds
  // max-age=60: Browser Cache holds it for 60 seconds
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=60, s-maxage=60",
      "Access-Control-Allow-Origin": "*" // Allow CORS
    }
  });
}
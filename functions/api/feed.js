export async function onRequest(context) {
  const { env } = context;

  // 1. SELECT DATABASE
  // (We check DB_1 for now. Later you can make this loop through all if needed)
  const db = env.DB_1; 

  try {
    // 2. FETCH LATEST POSTS
    // We select everything needed to show the "Card" in the feed
    const { results } = await db.prepare(
      "SELECT id, title, subheadline, author, date, image, tags FROM articles ORDER BY date DESC LIMIT 20"
    ).all();

    return new Response(JSON.stringify(results), {
      headers: { 
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60" // Cache for 1 min
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
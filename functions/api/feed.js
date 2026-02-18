export async function onRequest(context) {
  const { env } = context;
  const db = env.DB_1; 

  try {
    const { results } = await db.prepare(
      "SELECT id, title, subheadline, author, date, image, tags FROM articles ORDER BY date DESC LIMIT 20"
    ).all();

    return new Response(JSON.stringify(results), {
      headers: { 
        "Content-Type": "application/json",
        // INCREASED CACHE: Browser keeps for 5 mins, CDN for 1 hour
        "Cache-Control": "public, max-age=300, s-maxage=3600" 
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
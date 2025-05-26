export async function GET() {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "missing api key" }), {
      status: 500,
    });
  }

  const tmdbUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en`;

  const res = await fetch(tmdbUrl);
  if (!res.ok) {
    const text = await res.text();
    return new Response(JSON.stringify({ error: text }), {
      status: res.status,
    });
  }

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

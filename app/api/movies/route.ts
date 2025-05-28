import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "missing api key" }), {
      status: 500,
    });
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "popular";
  const pageRef = searchParams.get("page") || "1";

  const validCategories = ["popular", "top_rated", "now_playing", "upcoming"];
  if (!validCategories.includes(category)) {
    return new Response(JSON.stringify({ error: "invalid category" }), {
      status: 400,
    });
  }

  const tmdbUrl = `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&language=en-US&page=${pageRef}`;

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

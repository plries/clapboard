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
  const with_genres = searchParams.get("with_genres");
  const searchMovies = searchParams.get("search");

  const validCategories = ["popular", "top_rated", "now_playing", "upcoming"];
  if (!validCategories.includes(category)) {
    return new Response(JSON.stringify({ error: "invalid category" }), {
      status: 400,
    });
  }

  let tmdbUrl = "";

  if (with_genres) {
    tmdbUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=${pageRef}&with_genres=${with_genres}&sort_by=popularity.desc`;
  } if (searchMovies) {
    tmdbUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchMovies}&page=${pageRef}`;
  } else {
    tmdbUrl = `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&language=en-US&page=${pageRef}`;
  }

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

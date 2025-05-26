"use client";
import { useEffect, useState } from "react";
import { MovieTypes } from "../../types";
import { Movie } from "../Movie";

export const MovieList = () => {
  const [movies, setMovies] = useState<MovieTypes[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("/api/movies");
        const data = await res.json();
        setMovies(data.results);
      } catch (err) {
        setError("failed to load movies");
      }
    };

    fetchMovies();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div className="flex h-fit flex-row items-center gap-2">
      {movies.map((movie, index) => (
        <Movie key={movie.id} movie={movie} index={index} {...movie} />
      ))}
    </div>
  );
};

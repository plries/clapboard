"use client";
import { useEffect, useState } from "react";
import { MovieTypes, GenreTypes } from "@/app/types";

export const useMovieList = () => {
  const [movies, setMovies] = useState<MovieTypes[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [genres, setGenres] = useState<GenreTypes[]>([]);
  
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

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch("/api/genres");
        const data = await res.json();
        setGenres(data.genres);
      } catch (err) {
        setError("failed to load genres");
      }
    };

    fetchGenres();
  }, []);

  return {
    movies,
    error,
    genres
  };
};
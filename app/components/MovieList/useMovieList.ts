"use client";
import { useEffect, useState } from "react";
import { MovieTypes, GenreTypes } from "@/app/types";
import { useSearchParams } from "next/navigation";

export const useMovieList = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "popular";

  const [movies, setMovies] = useState<MovieTypes[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [genres, setGenres] = useState<GenreTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    
    const fetchMovies = async () => {
      try {
        const res = await fetch(`/api/movies?category=${category}`);
        const data = await res.json();
        setMovies(data.results);
        setIsLoading(false);
      } catch (err) {
        setError("failed to load movies");
      }
    };

    fetchMovies();
  }, [category]);

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
    genres,
    isLoading,
    setIsLoading,
  };
};
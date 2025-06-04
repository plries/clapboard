"use client";
import { useEffect, useState, useRef } from "react";
import { MovieTypes, GenreTypes } from "@/app/types";
import { useSearchParams } from "next/navigation";

export const useMovieList = ({
  genreId,
}: { genreId?: number}) => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "popular";
  const bottomRef = useRef<HTMLDivElement>(null);
  const movieListRef = useRef<HTMLDivElement>(null);

  const [movies, setMovies] = useState<MovieTypes[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [genres, setGenres] = useState<GenreTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const hasFetchedGenresRef = useRef(false);
  const hasFetchedMoviesRef = useRef(false);
  const pageRef = useRef(1);

  const fetchMovies = async (isNewCategory = false) => {
    setIsLoading(true);

    try {
      const res = await fetch(
        `/api/movies?category=${category}&page=${pageRef.current}`,
      );
      const data = await res.json();

      if (isNewCategory) {
        genreId = 0;
        setMovies(data.results);
        movieListRef.current?.classList.remove("hidden");
      } else {
        setMovies((prev) => {
          const existingIds = new Set(prev.map((m) => m.id));
          const newMovies = data.results.filter(
            (m: MovieTypes) => !existingIds.has(m.id),
          );
          return [...prev, ...newMovies];
        });
      }

      setIsLoading(false);
    } catch {
      setError("failed to load movies");
    }
  };

  const fetchFilteredMovies = async (isNewGenre = false) => {
    if (genreId === 0) return;
    setIsLoading(true);
    
    try {
      const res = await fetch(
        `/api/movies?with_genres=${genreId}&page=${pageRef.current}`,
      );
      const data = await res.json();

      if (isNewGenre) {
        setMovies(data.results);
        movieListRef.current?.classList.remove("hidden");
      } else {
        setMovies((prev) => {
          const existingIds = new Set(prev.map((m) => m.id));
          const newMovies = data.results.filter(
            (m: MovieTypes) => !existingIds.has(m.id),
          );
          return [...prev, ...newMovies];
        });
      }

      setIsLoading(false);
    } catch {
      setError("failed to load movies");
    }
  }

  useEffect(() => {
    if (hasFetchedGenresRef.current) return;
    hasFetchedGenresRef.current = true;

    const fetchGenres = async () => {
      try {
        const res = await fetch("/api/genres");
        const data = await res.json();
        setGenres(data.genres);
      } catch {
        setError("failed to load genres");
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    if (hasFetchedMoviesRef.current || genreId !== 0) return;
    hasFetchedMoviesRef.current = true;
    
    const fetchInitialMovies = async () => {
      pageRef.current = 1;

      movieListRef.current?.classList.add("hidden");
      setIsLoading(true);
      await fetchMovies(true);
      hasFetchedMoviesRef.current = false;
    }

    fetchInitialMovies();
  }, [category, genreId]);

  useEffect(() => {
    if (genreId === 0) return;
        
    const fetchInitialFilteredMovies = async () => {
      pageRef.current = 1;

      movieListRef.current?.classList.add("hidden");
      setIsLoading(true);
      setMovies([]);
      await fetchFilteredMovies(true);
    }

    fetchInitialFilteredMovies();
  }, [genreId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoading(true);
          pageRef.current += 1;
          if (genreId !== 0) {
            fetchFilteredMovies();
          } else {
            fetchMovies();
          }
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      },
    );

    const currentRef = bottomRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [genreId, isLoading]);

  return {
    movies,
    setMovies,
    error,
    genres,
    isLoading,
    setIsLoading,
    bottomRef,
    movieListRef,
    fetchMovies,
  };
};

"use client";
import { useEffect, useState, useRef } from "react";
import { MovieTypes, GenreTypes } from "@/app/types";
import { useSearchParams } from "next/navigation";

export const useMovieList = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "popular";
  const bottomRef = useRef<HTMLDivElement>(null);
  const movieListRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<SVGSVGElement>(null);

  const [movies, setMovies] = useState<MovieTypes[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [genres, setGenres] = useState<GenreTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const pageRef = useRef(1);

  const fetchMovies = async (isNewCategory = false) => {
    try {
      const res = await fetch(
        `/api/movies?category=${category}&page=${pageRef.current}`,
      );
      const data = await res.json();

      if (isNewCategory) {
        setMovies(data.results);
        movieListRef.current?.classList.remove("hidden");
        loadingRef.current?.classList.add("hidden");
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
    } catch (err) {
      setError("failed to load movies");
    }
  };

  useEffect(() => {
    setIsLoading(true);

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

  useEffect(() => {
    if (category !== "") {
      movieListRef.current?.classList.add("hidden");
      loadingRef.current?.classList.remove("hidden");

      setIsLoading(true);
      fetchMovies(true);
      pageRef.current = 1;
    }
  }, [category]);

  useEffect(() => {
    console.log("Setting up IntersectionObserver");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoading(true);
          pageRef.current += 1;
          fetchMovies();
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
  }, []);

  return {
    movies,
    error,
    genres,
    isLoading,
    setIsLoading,
    bottomRef,
    movieListRef,
    loadingRef,
  };
};

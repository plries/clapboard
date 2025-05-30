"use client";
import { useSearchParams } from "next/navigation";
import { Movie } from "@/app/components/";
import { useMovieList } from "./useMovieList";
import { CircleNotchIcon } from "@phosphor-icons/react";

export const MovieList = () => {
  const searchParams = useSearchParams();
  const genreId = searchParams.get("with_genres");

  // TODO: reset selected genre on category change

  const hook = useMovieList({ genreId: genreId ? Number(genreId) : undefined });

  if (hook.error) return <p>{hook.error}</p>;

  return (
    <>
      {hook.isLoading ? (
        <div
          ref={hook.movieListRef}
          className="grid auto-rows-min grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {hook.movies.map((movie) => (
            <Movie
              key={movie.id}
              movie={movie}
              genres={hook.genres}
              {...movie}
            />
          ))}

          <div
            ref={hook.bottomRef}
            className="col-span-full h-4 w-full bg-transparent"
          />
        </div>
      ) : (
        <div className="grid w-full place-items-center py-4">
          <CircleNotchIcon
            size={64}
            weight="light"
            className="animate-spin text-neutral-50/10"
          />
        </div>
      )}

      <CircleNotchIcon
        ref={hook.loadingRef}
        size={64}
        weight="light"
        className="animate-spin text-neutral-50/10"
      />
    </>
  );
};

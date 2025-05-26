"use client";
import { Movie } from "@/app/components/";
import { useMovieList } from "./useMovieList";

export const MovieList = () => {
  const hook = useMovieList();

  if (hook.error) return <p>{hook.error}</p>;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="flex flex-col gap-4">
        {hook.movies.slice(0, hook.movies.length / 3).map((movie, index) => (
          <Movie
            key={movie.id}
            movie={movie}
            index={index}
            genres={hook.genres}
            {...movie}
          />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {hook.movies
          .slice(hook.movies.length / 3, (hook.movies.length / 3) * 2)
          .map((movie, index) => (
            <Movie
              key={movie.id}
              movie={movie}
              index={index + 1}
              genres={hook.genres}
              {...movie}
            />
          ))}
      </div>
      <div className="flex flex-col gap-4">
        {hook.movies
          .slice((hook.movies.length / 3) * 2, hook.movies.length)
          .map((movie, index) => (
            <Movie
              key={movie.id}
              movie={movie}
              index={index + 2}
              genres={hook.genres}
              {...movie}
            />
          ))}
      </div>
    </div>
  );
};

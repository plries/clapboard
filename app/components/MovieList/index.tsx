"use client";
import { Movie } from "@/app/components/";
import { useMovieList } from "./useMovieList";
import { CircleNotchIcon } from "@phosphor-icons/react";

export const MovieList = () => {
  const hook = useMovieList();

  const col1 = hook.movies.slice(0, hook.movies.length / 3);
  const col2 = hook.movies.slice(
    hook.movies.length / 3,
    (hook.movies.length / 3) * 2,
  );
  const col3 = hook.movies.slice((hook.movies.length / 3) * 2);

  if (hook.error) return <p>{hook.error}</p>;

  if (hook.isLoading)
    return (
      <div className="grid h-full w-full place-items-center md:h-128">
        <CircleNotchIcon
          size={64}
          weight="light"
          className="animate-spin text-neutral-50/10"
        />
      </div>
    );

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="flex flex-col gap-4">
        {col1.map((movie, index) => (
          <Movie
            key={movie.id}
            movie={movie}
            index={index}
            genres={hook.genres}
            {...movie}
            position={index < col1.length / 2 ? "bottom" : "top"}
          />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {col2.map((movie, index) => (
          <Movie
            key={movie.id}
            movie={movie}
            index={index + 1}
            genres={hook.genres}
            {...movie}
            position={index < col2.length / 2 ? "bottom" : "top"}
          />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {col3.map((movie, index) => (
          <Movie
            key={movie.id}
            movie={movie}
            index={index + 2}
            genres={hook.genres}
            {...movie}
            position={index < col3.length / 2 ? "bottom" : "top"}
          />
        ))}
      </div>
    </div>
  );
};

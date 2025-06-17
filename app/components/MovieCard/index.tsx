"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  IconContext,
  StarIcon,
  ArticleIcon,
  XIcon,
  CameraIcon,
  CalendarDotsIcon,
  FireIcon,
} from "@phosphor-icons/react";
import { IconButton } from "@/app/components/";
import { MovieCardPropTypes } from "./types";
import { useMovieCard } from "./useMovieCard";

export const MovieCard = ({
  movie,
  genres,
  searchParams,
}: MovieCardPropTypes) => {
  const hook = useMovieCard();
  const params = new URLSearchParams(searchParams);

  const matchingMovieGenres = genres.map((genre) => {
    const match = movie.genre_ids.includes(genre.id);
    if (match) {
      return {
        id: genre.id,
        name: genre.name,
      };
    }
  });

  const movieGenres = matchingMovieGenres.filter(
    (genre) => genre !== undefined,
  );

  const starsOutOfFive = Math.round(movie.vote_average / 2);

  return (
    <IconContext.Provider value={{ size: 20 }}>
      {hook.isOpen && (
        <div
          className="fixed top-0 left-0 z-20 grid h-screen w-screen place-items-center overflow-y-scroll bg-neutral-950/50 p-6 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
          onClick={hook.toggleModal}
        />
      )}
      <motion.div
        ref={hook.movieRef}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className={`font-dm-sans group relative flex h-full w-full flex-col justify-between gap-2 rounded-2xl border border-neutral-300 bg-gradient-to-b from-slate-50 to-slate-400 p-1 shadow-xl ${hook.isOpen ? "z-50" : "z-10"}`}
        key={movie.id}
      >
        <div className="z-10 grid auto-rows-min grid-cols-[2fr_1fr] gap-4 p-1">
          <p
            className={`pr-4 !text-lg font-semibold text-slate-950 md:!text-xl lg:!text-2xl ${hook.isOpen ? "" : "line-clamp-2"}`}
          >
            {movie.title}
          </p>
          <div className="flex w-full flex-row justify-end p-1">
            {[...Array(5)].map((_, star) => (
              <StarIcon
                key={star}
                weight={star < starsOutOfFive ? "fill" : "regular"}
                className="text-slate-500"
              />
            ))}
          </div>
          <div className="col-span-2 flex flex-row flex-wrap gap-1">
            {movieGenres.map((genre) => (
              <p
                key={genre && genre.id}
                className="font-space-mono h-fit rounded-full border border-neutral-500/20 bg-neutral-950/1 px-2 py-1 !text-sm leading-normal text-neutral-600 inset-shadow-sm inset-shadow-slate-950/10 md:!text-base"
              >
                {genre && genre.name}
              </p>
            ))}
          </div>
        </div>
        <div className="relative rounded-2xl border border-neutral-950/10">
          {movie.popularity > 200 && (
            <div className="absolute bottom-2 left-2 z-20 flex flex-row items-center gap-1 rounded-full border border-slate-50/10 bg-slate-600/75 px-3 py-2 !text-sm leading-none text-slate-50 shadow-md backdrop-blur-md md:!text-base">
              <FireIcon size={16} />
              <span className="mb-0.5">trending</span>
            </div>
          )}
          <div
            className={`absolute right-2 bottom-2 z-20 flex flex-row gap-1 transition-opacity duration-300 ease-in-out`}
          >
            <IconButton
              name={`view ${movie.title} details`}
              icon={
                <span className="transition-transform duration-300 ease-in-out hover:rotate-10 group-disabled:hover:!rotate-0">
                  {hook.isOpen ? (
                    <XIcon className="text-slate-950" />
                  ) : (
                    <ArticleIcon className="text-slate-950" />
                  )}
                </span>
              }
              onClick={() => {
                hook.toggleModal();
                params.set("movie_id", movie.id.toString());
              }}
              disabled={
                !movie.overview && !movie.poster_path && !movie.backdrop_path
              }
            />
          </div>
          <div
            className={`mask-gradient absolute bottom-0 z-10 h-1/2 w-full rounded-b-2xl backdrop-blur-lg transition-all duration-300 group-hover:backdrop-blur-none ${hook.isOpen ? "!backdrop-blur-none" : ""}`}
          />
          <div className="overflow-hidden rounded-xl">
            {movie.backdrop_path ? (
              <>
                <Image
                  loading="lazy"
                  className={`transition-scale aspect-video w-full duration-300 group-hover:scale-105 ${hook.isOpen ? "scale-105" : ""}`}
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  alt={movie.title}
                  width={500}
                  height={281}
                />
              </>
            ) : (
              <div className="grid aspect-video h-full w-full place-items-center inset-shadow-sm inset-shadow-slate-950/10">
                <CameraIcon
                  size={64}
                  weight="light"
                  className="text-slate-950/25"
                />
              </div>
            )}
          </div>
        </div>
        <div
          ref={hook.descriptionRef}
          className={`absolute left-0 h-full w-full transition-[opacity,margin] duration-300 ease-in-out ${hook.position === "bottom" ? "top-0 origin-top translate-y-full" : "bottom-0 grid origin-bottom -translate-y-full place-items-end"} ${hook.isOpen ? "my-4" : "pointer-events-none opacity-0"}`}
        >
          <div className="relative grid h-fit w-full grid-cols-1 gap-2 rounded-2xl border border-neutral-300 bg-gradient-to-b from-neutral-50 to-slate-400 p-1 shadow-xl">
            <div className="font-space-mono flex flex-row items-center justify-between gap-2 rounded-xl border border-neutral-500/25 p-2 text-slate-950/75">
              <div className="flex flex-row items-center justify-between gap-2">
                <CalendarDotsIcon size={20} weight="light" />
                <p className="mb-0.5 leading-none">
                  <span className="!text-sm md:!text-base">
                    {new Date(movie.release_date).toLocaleString("default", {
                      month: "long",
                    })}{" "}
                    {new Date(movie.release_date).getDate()},{" "}
                    {new Date(movie.release_date).getFullYear()}
                  </span>
                </p>
              </div>
              <p className="mb-0.5 !text-sm leading-none md:!text-base">
                {movie.vote_count.toLocaleString()} votes
              </p>
            </div>
            <div className="description max-h-64 w-full overflow-y-scroll rounded-xl border border-neutral-500/25 p-2">
              <p className="!text-sm text-neutral-600 md:!text-base">
                {movie.overview ? movie.overview : "no overview available."}
              </p>
            </div>
          </div>
        </div>
        {movie.poster_path && (
          <div
            className={`absolute top-0 grid h-full place-items-center transition-[opacity,padding] duration-300 ease-in-out md:block ${hook.xPosition === "right" ? "right-0 translate-x-full" : "left-0 -translate-x-full"} ${hook.isOpen ? "px-4" : "pointer-events-none opacity-0"}`}
          >
            <Image
              loading="lazy"
              className={`h-full w-full rotate-0 rounded-2xl border border-neutral-300 shadow-xl transition-[rotate] duration-300 ease-in-out`}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={500}
              height={281}
            />
          </div>
        )}
      </motion.div>
    </IconContext.Provider>
  );
};

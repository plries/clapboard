"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  IconContext,
  BookmarkSimpleIcon,
  HeartIcon,
  ArticleIcon,
  XIcon,
  CameraIcon,
} from "@phosphor-icons/react";
import { IconButton } from "@/app/components/";
import { MoviePropTypes } from "./types";
import { useMovie } from "./useMovie";

export const Movie = ({ movie, genres }: MoviePropTypes) => {
  const hook = useMovie();

  const matchingMovieGenres = genres.map((genre) => {
    let match = movie.genre_ids.includes(genre.id);
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
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          ease: "easeInOut",
        }}
        className={`font-dm-sans group relative flex h-fit h-full w-full flex-col justify-between gap-2 rounded-2xl border border-neutral-300 bg-gradient-to-b from-neutral-50 to-neutral-400 p-1 shadow-xl ${hook.isOpen ? "z-50" : "z-10"}`}
        key={movie.id}
      >
        <div className="z-10 grid auto-rows-min grid-cols-[3fr_1fr] gap-4 p-1">
          <p
            className={`pr-4 !text-lg leading-none font-semibold text-neutral-950 md:!text-xl lg:!text-2xl ${hook.isOpen ? "" : "line-clamp-2"}`}
          >
            {movie.title}
          </p>
          <p className="font-space-mono leading-none text-neutral-600">
            <span className="block">
              {new Date(movie.release_date).toLocaleString("default", {
                month: "long",
              })}{" "}
            </span>
            {new Date(movie.release_date).getDate()},{" "}
            {new Date(movie.release_date).getFullYear()}
          </p>
          <div className="col-span-2 flex flex-row flex-wrap gap-1">
            {movieGenres.map((genre) => (
              <p
                key={genre && genre.id}
                className="font-space-mono h-fit rounded-full border border-neutral-500/10 bg-neutral-300/50 px-2 py-1 !text-sm leading-normal text-neutral-600 inset-shadow-sm md:!text-base"
              >
                {genre && genre.name}
              </p>
            ))}
          </div>
        </div>
        <div className="relative rounded-2xl border border-neutral-950/10">
          <div
            className={`absolute right-2 bottom-2 z-20 flex flex-row gap-1 transition-opacity duration-300 ease-in-out md:group-hover:opacity-100 ${hook.isOpen ? "md:opacity-100" : "md:opacity-0"}`}
          >
            <IconButton
              name={`add ${movie.title} to favourites`}
              icon={
                <HeartIcon className="text-neutral-950 transition-transform duration-300 ease-in-out hover:-rotate-15" />
              }
              additionalClasses={`md:group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-20 ${hook.isOpen ? "md:translate-x-0" : "md:translate-x-full "}`}
            />
            <IconButton
              name={`add ${movie.title} to watchlist`}
              icon={
                <BookmarkSimpleIcon className="text-neutral-950 transition-transform duration-300 ease-in-out hover:-translate-y-0.5" />
              }
              additionalClasses={`z-10 md:group-hover:translate-x-0 transition-transform duration-300 ease-in-out ${hook.isOpen ? "md:translate-x-0" : "md:translate-x-1/2"}`}
            />
            <IconButton
              name={`view ${movie.title} details`}
              icon={
                <span className="transition-transform duration-300 ease-in-out hover:rotate-10 group-disabled:hover:!rotate-0">
                  {hook.isOpen ? (
                    <XIcon className="text-neutral-950" />
                  ) : (
                    <ArticleIcon className="text-neutral-950" />
                  )}
                </span>
              }
              onClick={hook.toggleModal}
              disabled={!movie.overview}
            />
          </div>
          <div
            className={`mask-gradient absolute bottom-0 z-10 h-1/2 w-full rounded-b-2xl backdrop-blur-lg transition-all duration-300 group-hover:backdrop-blur-none ${hook.isOpen ? "!backdrop-blur-none" : ""}`}
          />
          <div className="overflow-hidden rounded-2xl">
            {movie.backdrop_path ? (
              <Image
                loading="lazy"
                className={`transition-scale aspect-video duration-300 group-hover:scale-105 ${hook.isOpen ? "scale-105" : ""}`}
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.title}
                width={500}
                height={281}
              />
            ) : (
              <div className="grid aspect-video h-full w-full place-items-center bg-neutral-300/50 inset-shadow-sm">
                <CameraIcon
                  size={64}
                  weight="light"
                  className="text-neutral-950/25"
                />
              </div>
            )}
          </div>
        </div>
        <div
          ref={hook.dropdownRef}
          className={`absolute left-0 h-full w-full transition-[opacity,margin] duration-300 ease-in-out ${hook.position === "bottom" ? "top-0 origin-top translate-y-full" : "bottom-0 grid origin-bottom -translate-y-full place-items-end"} ${hook.isOpen ? "my-4" : "pointer-events-none opacity-0"}`}
        >
          <div className="w-full overflow-hidden rounded-2xl border border-neutral-300 bg-gradient-to-b from-neutral-50 to-neutral-400 p-1 shadow-xl">
            <p className="rounded-xl border border-neutral-500/25 p-2 !text-sm leading-normal text-neutral-600 md:!text-base">
              {movie.overview ? movie.overview : "no overview available."}
            </p>
          </div>
        </div>
      </motion.div>
    </IconContext.Provider>
  );
};

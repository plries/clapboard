"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { IconButton } from "@/app/components/";
import { MoviePropTypes } from "./types";

export const Movie = ({ movie, index, genres }: MoviePropTypes) => {
  const movieGenres = genres.map((genre) => {
    let match = movie.genre_ids.includes(genre.id);
    if (match) {
      return {
        id: genre.id,
        name: genre.name,
      };
    }
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeInOut" }}
      className="font-dm-sans z-10 flex h-fit w-full flex-col gap-2 rounded-2xl border border-neutral-300 bg-gradient-to-b from-neutral-50 to-neutral-400 p-1 font-medium lowercase shadow-xl"
      key={movie.id}
    >
      <div className="grid auto-rows-min grid-cols-[3fr_1fr] gap-4 p-1">
        <p className="pr-4 text-lg leading-none text-neutral-950 md:text-xl lg:text-2xl">
          {movie.title}
        </p>
        <p className="font-space-mono lg:text-md text-sm leading-none text-neutral-500 md:text-base">
          <span className="block">
            {new Date(movie.release_date).toLocaleString("default", {
              month: "long",
            })}{" "}
          </span>
          {new Date(movie.release_date).getDate()},{" "}
          {new Date(movie.release_date).getFullYear()}
        </p>
        <div className="col-span-2 flex flex-row flex-wrap gap-1">
          {movieGenres
            .filter((genre) => genre !== undefined)
            .map((genre) => (
              <p
                key={genre && genre.id}
                className="font-space-mono h-fit rounded-full border border-neutral-500/10 bg-neutral-300/50 px-2 py-1 text-sm leading-normal text-neutral-500 inset-shadow-sm md:text-base"
              >
                {genre && genre.name}
              </p>
            ))}
        </div>
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-neutral-950/10">
        <IconButton
          name={`view ${movie.title} details`}
          icon={
            <ArrowUpRightIcon
              size={20}
              className="text-neutral-950 transition-transform duration-300 ease-in-out group-hover:rotate-45"
            />
          }
          additionalClasses="absolute bottom-2 right-2 z-20 peer"
        />
        <div className="mask-gradient absolute bottom-0 z-10 h-1/2 w-full backdrop-blur-sm transition-all duration-300 peer-hover:backdrop-blur-none" />
        <Image
          className="transition-scale aspect-video duration-300 peer-hover:scale-105"
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt={movie.title}
          width={500}
          height={281}
        />
      </div>
    </motion.article>
  );
};

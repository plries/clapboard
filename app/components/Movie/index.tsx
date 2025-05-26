"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { IconButton } from "@/app/components/";
import { MoviePropTypes } from "./types";

export const Movie = ({ movie, index }: MoviePropTypes) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeInOut" }}
      className="font-dm-sans z-10 flex h-fit w-96 flex-col gap-2 rounded-2xl border border-neutral-300 bg-neutral-100 p-1 font-medium lowercase shadow-md"
      key={movie.id}
    >
      <div className="grid grid-cols-[3fr_1fr] gap-0.5 pt-1 pl-1">
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
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-neutral-950/10">
        <IconButton
          name={`view ${movie.title} details`}
          icon={
            <ArrowUpRightIcon
              size={20}
              className="text-neutral-950 transition-transform duration-300 ease-in-out hover:rotate-45"
            />
          }
          additionialClasses="absolute bottom-2 right-2 z-10"
        />
        <div className="mask-gradient absolute h-full w-full backdrop-blur-sm" />
        <Image
          className="aspect-video"
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt={movie.title}
          width={1000}
          height={1500}
        />
      </div>
    </motion.article>
  );
};

"use client";
import {
  CalendarDotsIcon,
  FilmReelIcon,
  ShootingStarIcon,
  SparkleIcon,
} from "@phosphor-icons/react";

export const PAGE_CONST = {
  HEADING: ["the ", <span className="text-slate-400">movie</span>, " database"],
  BUTTONS: [
    { label: "popular", value: "popular", icon: <SparkleIcon /> },
    { label: "now playing", value: "now_playing", icon: <FilmReelIcon /> },
    { label: "top rated", value: "top_rated", icon: <ShootingStarIcon /> },
    { label: "upcoming", value: "upcoming", icon: <CalendarDotsIcon /> },
  ],
  DROPDOWNS: {
    GENRES: {
      BUTTON: "genres",
      ALL_GENRES: "all genres",
    },
  },
};

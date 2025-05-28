"use client";
import {
  CalendarDotsIcon,
  FilmReelIcon,
  ShootingStarIcon,
  SparkleIcon,
} from "@phosphor-icons/react";

export const PAGE_CONST = {
  HEADING: "the movie database",
  BUTTONS: [
    { label: "popular", value: "popular", icon: <SparkleIcon /> },
    { label: "now playing", value: "now_playing", icon: <FilmReelIcon /> },
    { label: "top rated", value: "top_rated", icon: <ShootingStarIcon /> },
    { label: "upcoming", value: "upcoming", icon: <CalendarDotsIcon /> },
  ],
  DROPDOWNS: {
    GENRES: "genres",
  },
};

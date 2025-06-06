"use client";
import {
  CalendarDotsIcon,
  FilmReelIcon,
  ShootingStarIcon,
  SparkleIcon,
} from "@phosphor-icons/react";

export const PAGE_CONST = {
  HEADING: [
    "the ",
    <span key="movie" className="text-slate-400">
      movie
    </span>,
    " database",
  ],
  INPUTS: {
    SEARCH: "search...",
  },
  BUTTONS: {
    FILTERS: [
      {
        label: "popular",
        value: "popular",
        icon: <SparkleIcon key="sparkle" />,
      },
      {
        label: "now playing",
        value: "now_playing",
        icon: <FilmReelIcon key="film" />,
      },
      {
        label: "top rated",
        value: "top_rated",
        icon: <ShootingStarIcon key="star" />,
      },
      {
        label: "upcoming",
        value: "upcoming",
        icon: <CalendarDotsIcon key="calendar" />,
      },
    ],
    BACK_TO_TOP: "back to top",
  },
  DROPDOWNS: {
    GENRES: {
      BUTTON: "genres",
      ALL_GENRES: "all genres",
    },
  },
};

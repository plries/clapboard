import { GenreTypes, MovieTypes } from "@/app/types";

export type MovieCardPropTypes = {
  movie: MovieTypes;
  genres: GenreTypes[];
  searchParams: URLSearchParams;
};

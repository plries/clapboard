import { GenreTypes,MovieTypes } from "@/app/types";

export type MoviePropTypes = {
  movie: MovieTypes;
  index: number;
  genres: GenreTypes[];
}
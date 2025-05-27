export type MovieTypes = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  genre_ids: number[];
};

export type GenreTypes = {
  id: number;
  name: string;
};
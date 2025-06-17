export type MovieTypes = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  genre_ids: number[];
  vote_average: number;
  vote_count: number;
  popularity: number;

  origin_country?: string;
  production_companies?: { id: number; name: string; logo_path: string }[];
  budget?: number;
  credits?: {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path: string;
    }[];
    crew: {
      id: number;
      department: string;
      name: string;
      job: string;
      profile_path: string;
    }[];
  };
};

export type GenreTypes = {
  id: number;
  name: string;
};

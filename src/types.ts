export interface YearList {
    [year: string]: Movie[];
}

export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    genre_ids: number[];
    cast: string;
    director: string;
    overview: string;
    year?: number
  }
  
  export interface Genre {
    id: number;
    name: string;
  }
  
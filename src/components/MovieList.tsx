import React from "react";
import { Genre, Movie, YearList } from "../types";
import MovieCard from "./MovieCard";

interface MovieListProps {
  movies: YearList;
  genres: Genre[];
}

const MovieList: React.FC<MovieListProps> = ({ movies ,genres }) => {
  return (
    <div className="movies-container">
      {Object.keys(movies)?.map((item) => {
        return (
          <div key={item} className="movies-panel">
            <h2>Year : {item}</h2>
            <div className="movie-list">
              {movies?.[item].map((movie: Movie) => {
                return <MovieCard key={movie?.id} movie={movie} genres={genres} />;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MovieList;

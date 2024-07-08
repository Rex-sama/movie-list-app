import React from "react";
import { Movie } from "../types";
import MovieCard from "./MovieCard";

interface MovieListProps {
  movies: any;
  genres:any
}

const MovieList: React.FC<MovieListProps> = ({ movies ,genres }) => {
  return (
    <div className="movies-container">
      {Object.keys(movies)?.map((item) => {
        return (
          <div key={item} className="movies-panel">
            <h2>Year : {item}</h2>
            <div className="movie-list">
              {movies?.[item].map((movie: any) => {
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

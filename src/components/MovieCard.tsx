import React from "react";
import { Movie } from "../types";

interface MovieCardProps {
  movie: Movie;
  genres: any;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, genres }) => {
  const genreList = movie?.genre_ids?.map((id: any) => {
    const findItem = genres.find((genre: any) => genre.id === id);
    return findItem.name;
  }).join(", ");

//   console.log(movie?.genre_ids, genres, genreList);

  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
        alt={movie?.title}
        className="movie-image"
      />
      {/* <div className="movie-desc">{genreList}</div> */}
      <div className="movie-info">
        <p className="movie-title">{movie?.title}</p>
        {/* <p className="genre-list"><span>{genreList}</span></p> */}
        {/* <p>Cast: {movie?.cast}</p>
        <p>Director: {movie?.director}</p> */}
        {/* <p>{movie.overview}</p> */}
      </div>
    </div>
  );
};

export default MovieCard;

import React from "react";
import { Genre, Movie } from "../types";
import DefaultImg from '../assets/placeholder_img.png'

interface MovieCardProps {
  movie: Movie;
  genres: Genre[];
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, genres }) => {
  const genreList = movie?.genre_ids?.map((id: number) => {
    const findItem = genres && genres.find((genre: Genre) => genre.id === id);
    return findItem?.name;
  }).join(", ");
  const posterPath = movie?.poster_path ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}`:DefaultImg

//   console.log(movie?.genre_ids, genres, genreList);

  return (
    <div className="movie-card">
      <img
        src={posterPath}
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

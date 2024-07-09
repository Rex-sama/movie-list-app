import React, { useState } from "react";
import { Genre, Movie } from "../types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import DefaultImg from '../assets/placeholder_img.png';

interface MovieCardProps {
  movie: Movie;
  genres: Genre[];
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const posterPath = movie?.poster_path ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}` : DefaultImg;

  const handleImageLoaded = () => {
    setIsLoaded(true);
  };

  return (
    <div className={`movie-card`}>
      <div className="image-container">
        {!isLoaded && <img src={DefaultImg} alt="placeholder" className="placeholder-image" />}
        <LazyLoadImage
          src={posterPath}
          alt={movie?.title}
          effect="blur"
          placeholderSrc={DefaultImg}
          className="movie-image"
          afterLoad={handleImageLoaded}
          visibleByDefault={!movie?.poster_path} // Show placeholder immediately if there's no poster path
        />
      </div>
      <div className="movie-info">
        <p className="movie-title">{movie?.title}</p>
      </div>
    </div>
  );
};

export default MovieCard;

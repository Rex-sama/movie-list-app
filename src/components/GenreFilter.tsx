import React from "react";
import { Genre } from "../types";

interface GenreFilterProps {
  genres: Genre[];
  selectedGenres: number[];
  onGenreChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({
  genres,
  selectedGenres,
  onGenreChange,
}) => {
  return (
    <div className="genre-filter">
      {genres.map((genre) => (
        <label
          key={genre.id}
          className={`genre-card ${
            selectedGenres.includes(genre.id) ? "enable" : ""
          }`}
        >
          <input
            type="checkbox"
            style={{ display: "none" }}
            value={genre.id}
            checked={selectedGenres.includes(genre.id)}
            onChange={onGenreChange}
          />
          {genre.name}
        </label>
      ))}
    </div>
  );
};

export default GenreFilter;

import React, { useState, useEffect, KeyboardEvent } from "react";
import MovieList from "./components/MovieList";
import GenreFilter from "./components/GenreFilter";
import { Movie, Genre, YearList } from "./types";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";

const App: React.FC = () => {
  const [movies, setMovies] = useState<YearList>({});
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [year, setYear] = useState<number>(2012);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchMovies, setSearchMovies] = useState<Movie[]>([]);
  const [searchString, setSearchString] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [showSearch, setShowSearch] = useState<Boolean>(false);
  const isEmpty =
    (movies[year] && movies[year].length === 0) ||
    (showSearch && searchMovies.length === 0);

  const apiKey = "2dca580c2a14b55200e784d157207b4d";

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchMovies(year);
  }, [year]);

  useEffect(() => {
    const handleScroll = () => {
      const innerHeight = window.innerHeight;
      const scrollPosition = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const date = new Date();
      if (date.getFullYear() > year) {
        if (innerHeight + scrollPosition + 1 >= scrollHeight) {
          console.log("MAI CHALA", searchString);
          if (searchString && showSearch) {
            onSearch();
          } else {
            console.log("MAI KYU CHALA", searchString);
            setYear((prev) => prev + 1);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  console.log("MAIJASHJDK", searchString, page);

  const fetchGenres = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
    );
    const data = await response.json();
    setGenres(data.genres);
  };

  const fetchMovies = async (year: number, genreList?: number[]) => {
    setLoading(true);

    const genreQuery =
      genreList && genreList?.length
        ? `&with_genres=${genreList.join(",")}`
        : "";
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&primary_release_year=${year}&vote_count.gte=100${genreQuery}&page=1`
      );
      const data = await response.json();
      setMovies((prevMovies: any) => ({
        ...prevMovies,
        [year]: data.results,
      }));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const genreId = parseInt(e.target.value);
    let a;
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
      a = selectedGenres.filter((id) => id !== genreId);
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
      a = [...selectedGenres, genreId];
    }
    console.log("ASD", a);
    setYear(2012);
    setPage(1);
    setSearchString("");
    setMovies({});
    fetchMovies(2012, a);
    setShowSearch(false);
  };

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    console.log("NNNNNN", searchString);
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchString) {
        setSelectedGenres([]);
        setSearchMovies([]);
        onSearch(1);
      } else {
        setShowSearch(false);
        setSearchMovies([]);
        fetchMovies(2012);
      }
    }
  };

  const onSearch = async (pageNo?: number) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchString}&include_adult=false&language=en-US&page=${
        pageNo || page
      }`
    );
    const data = await response.json();
    setSearchMovies((prevMovies) => [...prevMovies, ...data.results]);
    setShowSearch(true);
    setPage((prev) => prev + 1);
  };

  console.log(movies);
  console.log(searchMovies);
  return (
    <div className="App">
      <div className="main-header-section">
        <h1 className="main-title">MovieFix</h1>
        <GenreFilter
          genres={genres}
          selectedGenres={selectedGenres}
          onGenreChange={handleGenreChange}
        />
        <SearchBar
          searchString={searchString}
          setSearchString={setSearchString}
          handleSearch={handleSearch}
        />
      </div>
      {loading && <h2 style={{ textAlign: "center" }}>Loading</h2>}
      {isEmpty && <h2 style={{ textAlign: "center" }}>No movies found</h2>}
      {showSearch && searchMovies.length != 0 && (
        <div className="movies-container">
          <div className="movie-list">
            {searchMovies?.map((movie: Movie) => {
              return (
                <MovieCard key={movie?.id} movie={movie} genres={genres} />
              );
            })}
          </div>
        </div>
      )}
      {!isEmpty && !showSearch && <MovieList movies={movies} genres={genres} />}
    </div>
  );
};

export default App;

import React, { useState, useEffect, useCallback, useRef } from "react";
import MovieList from "./components/MovieList";
import GenreFilter from "./components/GenreFilter";
import { Movie, Genre } from "./types";

const App: React.FC = () => {
  const [movies, setMovies] = useState<any>({});
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [year, setYear] = useState<number>(2012);
  const [loading, setLoading] = useState<boolean>(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const scrollPosition = useRef<number | null>(null);
  const isEmpty = movies[year] && movies[year].length === 0;

  const apiKey = "2dca580c2a14b55200e784d157207b4d";

  useEffect(() => {
    fetchGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          setYear((prev) => prev + 1);
        }
      }

      // if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {
      //   return;
      // }
      // if(window.innerHeight)
      // scrollPosition.current = window.scrollY;
      // fetchMovies(year)
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  // useEffect(() => {
  //   if (scrollPosition.current !== null) {
  //     window.scrollTo(0, scrollPosition.current);
  //     scrollPosition.current = null;
  //   }
  // }, [movies]);

  const fetchGenres = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
    );
    const data = await response.json();
    setGenres(data.genres);
  };

  const fetchMovies = async (year: number, genreList?: any) => {
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

    setYear(2012);
    setMovies({});
    fetchMovies(2012, a);
  };
  console.log(movies);
  return (
    <div className="App">
      <div className="main-header-section">
        <h1 className="main-title">MovieFix</h1>
        <GenreFilter
          genres={genres}
          selectedGenres={selectedGenres}
          onGenreChange={handleGenreChange}
        />
      </div>
      {loading && <h2 style={{textAlign:'center'}}>Loading</h2>}
      {isEmpty && <h2 style={{textAlign:'center'}}>No movies found</h2>}

      {!isEmpty && <MovieList movies={movies} genres={genres} />}
    </div>
  );
};

export default App;

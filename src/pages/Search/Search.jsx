import {
  TextField,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar/Navbar";
import MovieCard from "../../components/MovieCard/MovieCard";

import { searchMovies, getGenres } from "../../services/tmdbApi";

import { useMovieContext } from "../../context/MovieContext";

const Search = () => {
  const [query, setQuery] = useState("");

  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");

  const [genres, setGenres] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const { searchResults, setSearchResults } = useMovieContext();

  useEffect(() => {
    const lastSearch = localStorage.getItem("lastSearch");

    if (lastSearch) {
      setQuery(lastSearch);
    }
  }, []);

  useEffect(() => {
    const loadGenres = async () => {
      const genreData = await getGenres();
      setGenres(genreData);
    };

    loadGenres();
  }, []);

  useEffect(() => {
    const runLastSearch = async () => {
      const lastSearch = localStorage.getItem("lastSearch");

      if (!lastSearch) return;

      const data = await searchMovies(lastSearch);

      setSearchResults(data.results);
      setFilteredMovies(data.results);
    };

    runLastSearch();
  }, [setSearchResults]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    localStorage.setItem("lastSearch", query);

    const data = await searchMovies(query);

    setSearchResults(data.results);
    setFilteredMovies(data.results);
  };

  const applyFilters = () => {
    const filtered = searchResults.filter((movie) => {
      const genreMatch = !genre || movie.genre_ids?.includes(Number(genre));

      const yearMatch = !year || movie.release_date?.startsWith(year);

      const ratingMatch = !rating || movie.vote_average >= Number(rating);

      return genreMatch && yearMatch && ratingMatch;
    });

    setFilteredMovies(filtered);
  };

  const clearFilters = () => {
    setGenre("");
    setYear("");
    setRating("");

    setFilteredMovies(searchResults);
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          padding: "20px",
          paddingTop: "90px",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Search Movies
        </Typography>

        <TextField
          fullWidth
          label="Search movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <Button
          variant="contained"
          sx={{ mt: 2, mb: 3 }}
          onClick={handleSearch}
        >
          Search
        </Button>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Genre</InputLabel>

              <Select
                value={genre}
                label="Genre"
                onChange={(e) => setGenre(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>

                {genres.map((genreItem) => (
                  <MenuItem key={genreItem.id} value={genreItem.id}>
                    {genreItem.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Year</InputLabel>

              <Select
                value={year}
                label="Year"
                onChange={(e) => setYear(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>

                <MenuItem value="2026">2026</MenuItem>

                <MenuItem value="2025">2025</MenuItem>

                <MenuItem value="2024">2024</MenuItem>

                <MenuItem value="2023">2023</MenuItem>

                <MenuItem value="2022">2022</MenuItem>

                <MenuItem value="2021">2021</MenuItem>

                <MenuItem value="2020">2020</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Rating</InputLabel>

              <Select
                value={rating}
                label="Rating"
                onChange={(e) => setRating(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>

                <MenuItem value="7">7+</MenuItem>

                <MenuItem value="8">8+</MenuItem>

                <MenuItem value="9">9+</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="secondary"
          sx={{ mr: 2, mb: 4 }}
          onClick={applyFilters}
        >
          Apply Filters
        </Button>

        <Button variant="outlined" sx={{ mb: 4 }} onClick={clearFilters}>
          Clear Filters
        </Button>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Results: {filteredMovies.length}
        </Typography>

        <Grid container spacing={3}>
          {filteredMovies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Search;

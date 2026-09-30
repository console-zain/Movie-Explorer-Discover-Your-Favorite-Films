import { TextField, Button, Typography, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import MovieCard from "../../components/MovieCard/MovieCard";
import { searchMovies } from "../../services/tmdbApi";
import { useMovieContext } from "../../context/MovieContext";

const Search = () => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const lastSearch = localStorage.getItem("lastSearch");

    if (lastSearch) {
      setQuery(lastSearch);
    }
  }, []);

  const { searchResults, setSearchResults } = useMovieContext();

  useEffect(() => {
    const runLastSearch = async () => {
      const lastSearch = localStorage.getItem("lastSearch");

      if (!lastSearch) return;

      const data = await searchMovies(lastSearch);

      setSearchResults(data.results);
    };

    runLastSearch();
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;

    localStorage.setItem("lastSearch", query);

    const data = await searchMovies(query);

    setSearchResults(data.results);
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>
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
          sx={{ mt: 2, mb: 4 }}
          onClick={handleSearch}
        >
          Search
        </Button>

        <Grid container spacing={3}>
          {searchResults.map((movie) => (
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

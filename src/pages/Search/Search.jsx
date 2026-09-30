import {
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar/Navbar";
import MovieCard from "../../components/MovieCard/MovieCard";

import { searchMovies, getGenres } from "../../services/tmdbApi";

import { useMovieContext } from "../../context/MovieContext";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const Search = () => {
  const [query, setQuery] = useState("");

  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");

  const [genres, setGenres] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

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

      try {
        const data = await searchMovies(lastSearch, 1);

        setSearchResults(data.results);

        setFilteredMovies(data.results);

        setHasMore(data.page < data.total_pages);
      } catch (err) {
        setError("Failed to load previous search.");
      }
    };

    runLastSearch();
  }, [setSearchResults]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError(null);

      localStorage.setItem("lastSearch", query);

      setPage(1);

      const data = await searchMovies(query, 1);

      setSearchResults(data.results);

      setFilteredMovies(data.results);

      setHasMore(data.page < data.total_pages);
    } catch (err) {
      setError("Search failed.");
    } finally {
      setLoading(false);
    }
  };

  const theme = useTheme();

  const handleLoadMore = async () => {
    try {
      const nextPage = page + 1;

      const data = await searchMovies(query, nextPage);

      const updatedMovies = [...searchResults, ...data.results];

      setPage(nextPage);

      setSearchResults(updatedMovies);

      setFilteredMovies(updatedMovies);

      setHasMore(nextPage < data.total_pages);
    } catch (err) {
      setError("Failed to load more movies.");
    }
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

      <Box
        sx={{
          minHeight: "100vh",
          background: theme.palette.background.default,
          color: theme.palette.text.primary,
          pt: 14,
          pb: 6,
        }}
      >
        <Box
          sx={{
            maxWidth: "1700px",
            mx: "auto",
            px: 4,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 5,
              mb: 5,

              borderRadius: 6,

              backdropFilter: "blur(20px)",

              background: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 1,
              }}
            >
              Discover Something New
            </Typography>

            <Typography
              sx={{
                color: theme.palette.text.secondary,
                mb: 4,
              }}
            >
              Search and explore movies from around the world.
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
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
                sx={{
                  flex: 1,
                }}
              />

              <Button
                variant="contained"
                onClick={handleSearch}
                sx={{
                  minWidth: 160,
                  background: "#E50914",

                  "&:hover": {
                    background: "#B20710",
                  },
                }}
              >
                Search
              </Button>
            </Box>
          </Paper>

          {loading && <LoadingSpinner />}

          {error && <ErrorMessage message={error} />}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h5">Search Results</Typography>

            <Typography
              sx={{
                color: theme.palette.text.secondary,
              }}
            >
              {filteredMovies.length} movies
            </Typography>
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 4,

              borderRadius: 6,

              backdropFilter: "blur(20px)",

              background: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontWeight: 600,
              }}
            >
              Filters
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                alignItems: "center",
              }}
            >
              <FormControl sx={{ minWidth: 220 }}>
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

              <FormControl sx={{ minWidth: 180 }}>
                <InputLabel>Year</InputLabel>

                <Select
                  value={year}
                  label="Year"
                  onChange={(e) => setYear(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>

                  {[2026, 2025, 2024, 2023, 2022, 2021, 2020].map((y) => (
                    <MenuItem key={y} value={String(y)}>
                      {y}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 180 }}>
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

              <Button
                variant="contained"
                onClick={applyFilters}
                sx={{
                  height: 56,

                  background: "#E50914",

                  "&:hover": {
                    background: "#B20710",
                  },
                }}
              >
                Apply Filters
              </Button>

              <Button
                variant="outlined"
                onClick={clearFilters}
                sx={{
                  height: 56,
                }}
              >
                Clear Filters
              </Button>
            </Box>
          </Paper>

          {filteredMovies.length === 0 && (
            <Paper
              elevation={0}
              sx={{
                p: 5,
                textAlign: "center",
                borderRadius: 6,
                background: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Typography variant="h4">No movies found</Typography>

              <Typography
                sx={{
                  color: theme.palette.text.secondary,
                  mt: 2,
                }}
              >
                Try a different search term or adjust your filters.
              </Typography>
            </Paper>
          )}

          {filteredMovies.length > 0 && (
            <Box
              sx={{
                maxWidth: "1600px",

                mx: "auto",

                display: "grid",

                gridTemplateColumns: "repeat(auto-fill, minmax(230px, 230px))",

                justifyContent: "center",

                gap: 3,
              }}
            >
              {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </Box>
          )}

          {hasMore && filteredMovies.length > 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 6,
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={handleLoadMore}
                sx={{
                  px: 5,
                  py: 1.5,
                  background: "#E50914",

                  "&:hover": {
                    background: "#B20710",
                  },
                }}
              >
                Load More Movies
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Search;

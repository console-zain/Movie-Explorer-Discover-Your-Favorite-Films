import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Container,
  Card,
  CardMedia,
  Typography,
  Chip,
  CircularProgress,
} from "@mui/material";

import { getMovieDetails } from "../../services/tmdbApi";

const MovieDetails = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await getMovieDetails(id);

      setMovie(data);
      setLoading(false);
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>Movie not found.</Typography>
      </Container>
    );
  }

  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ p: 3 }}>
        <CardMedia
          component="img"
          image={posterUrl}
          alt={movie.title}
          sx={{
            maxWidth: 300,
            margin: "auto",
            borderRadius: 2,
          }}
        />

        <Typography variant="h4" sx={{ mt: 2 }}>
          {movie.title}
        </Typography>

        <Typography variant="h6" color="text.secondary">
          Release Date: {movie.release_date}
        </Typography>

        <Typography variant="h6" sx={{ mt: 1 }}>
          Rating: {movie.vote_average?.toFixed(1)}
        </Typography>

        <Typography variant="h6" sx={{ mt: 1 }}>
          Runtime: {movie.runtime} min
        </Typography>

        <Typography sx={{ mt: 3 }}>{movie.overview}</Typography>

        <Typography variant="h6" sx={{ mt: 3 }}>
          Genres
        </Typography>

        {movie.genres.map((genre) => (
          <Chip key={genre.id} label={genre.name} sx={{ mr: 1, mt: 1 }} />
        ))}
      </Card>
    </Container>
  );
};

export default MovieDetails;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
  Container,
  Card,
  CardMedia,
  Typography,
  Chip,
  Button,
} from "@mui/material";

import Navbar from "../../components/Navbar/Navbar";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import {
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
} from "../../services/tmdbApi";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null);

        const movieData = await getMovieDetails(id);

        const castData = await getMovieCredits(id);

        const videoData = await getMovieVideos(id);

        const officialTrailer = videoData.find(
          (video) => video.type === "Trailer" && video.site === "YouTube",
        );

        setMovie(movieData);
        setCast(castData.slice(0, 10));
        setTrailer(officialTrailer);
      } catch (err) {
        console.error(err);
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <LoadingSpinner />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <ErrorMessage message={error} />
      </>
    );
  }

  if (!movie) {
    return (
      <>
        <Navbar />

        <Container sx={{ mt: 12 }}>
          <Typography>Movie not found.</Typography>
        </Container>
      </>
    );
  }

  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <>
      <Navbar />

      <Container sx={{ mt: 12, mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 2 }}
        >
          Back
        </Button>

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

          <Typography variant="h6" sx={{ mt: 4 }}>
            Cast
          </Typography>

          {cast.map((actor) => (
            <Chip
              key={actor.cast_id || actor.id}
              label={actor.name}
              sx={{ mr: 1, mt: 1 }}
            />
          ))}

          <div style={{ marginTop: "30px" }}>
            <Typography variant="h6" gutterBottom>
              Official Trailer
            </Typography>

            {trailer ? (
              <div
                style={{
                  position: "relative",
                  paddingBottom: "56.25%",
                  height: 0,
                  overflow: "hidden",
                  maxWidth: "100%",
                  borderRadius: "8px",
                }}
              >
                {`https://www.youtube.com/embed/${trailer.key}`}
              </div>
            ) : (
              <Typography
                sx={{
                  mt: 1,
                  color: "text.secondary",
                }}
              >
                No trailer available for this movie.
              </Typography>
            )}
          </div>
        </Card>
      </Container>
    </>
  );
};

export default MovieDetails;

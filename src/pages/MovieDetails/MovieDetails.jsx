import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarIcon from "@mui/icons-material/Star";

import {
  Container,
  CardMedia,
  Typography,
  Chip,
  Button,
  Box,
  Divider,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

import Navbar from "../../components/Navbar/Navbar";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import {
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
} from "../../services/tmdbApi";

const MEDIA_HEIGHT = {
  xs: "auto",
  md: 520,
};

const MovieDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const theme = useTheme();

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

        <Container sx={{ mt: 14 }}>
          <Typography>Movie not found.</Typography>
        </Container>
      </>
    );
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const overlay =
    theme.palette.mode === "dark"
      ? "linear-gradient(rgba(20,20,20,0.88), rgba(20,20,20,0.97))"
      : "linear-gradient(rgba(245,245,245,0.92), rgba(245,245,245,0.97))";

  const pageBackground = movie.backdrop_path
    ? `${overlay}, url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
    : theme.palette.background.default;

  const year = movie.release_date ? movie.release_date.slice(0, 4) : "";

  return (
    <>
      <Navbar />

      <Box
        sx={{
          minHeight: "100vh",

          backgroundImage: pageBackground,

          backgroundSize: "cover",

          backgroundPosition: "center",

          backgroundAttachment: "fixed",

          color: theme.palette.text.primary,

          pt: 12,

          pb: 8,
        }}
      >
        <Container maxWidth="xl">
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
              mb: 2,

              color: theme.palette.text.secondary,
            }}
          >
            Back
          </Button>

          <Box
            sx={{
              display: "flex",

              justifyContent: "space-between",

              alignItems: "flex-start",

              gap: 3,

              flexWrap: "wrap",

              mb: 2,
            }}
          >
            <Box>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,

                  lineHeight: 1.1,

                  mb: 0.5,
                }}
              >
                {movie.title}
              </Typography>

              <Typography
                sx={{
                  color: theme.palette.text.secondary,
                }}
              >
                {year}
                {movie.runtime ? ` · ${movie.runtime} min` : ""}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",

                alignItems: "center",

                gap: 1,
              }}
            >
              <StarIcon
                sx={{
                  color: "#F5C518",

                  fontSize: 36,
                }}
              />

              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                }}
              >
                {movie.vote_average?.toFixed(1)}

                <Typography
                  component="span"
                  sx={{
                    color: theme.palette.text.secondary,

                    fontSize: "1rem",
                  }}
                >
                  /10
                </Typography>
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",

              gap: 1.5,

              flexDirection: {
                xs: "column",
                md: "row",
              },
            }}
          >
            <CardMedia
              component="img"
              image={posterUrl}
              alt={movie.title}
              sx={{
                width: {
                  xs: "100%",
                  md: "25%",
                },

                height: MEDIA_HEIGHT,

                objectFit: "cover",

                borderRadius: 3,
              }}
            />

            <Box
              sx={{
                position: "relative",

                flex: 1,

                height: MEDIA_HEIGHT,

                aspectRatio: {
                  xs: "16 / 9",
                  md: "auto",
                },

                borderRadius: 3,

                overflow: "hidden",

                bgcolor: theme.palette.background.paper,

                display: "flex",

                alignItems: "center",

                justifyContent: "center",
              }}
            >
              {trailer ? (
                <iframe
                  title="movie-trailer"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  frameBorder="0"
                  style={{
                    width: "100%",
                    height: "100%",
                    border: 0,
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <Typography
                  sx={{
                    color: theme.palette.text.secondary,
                  }}
                >
                  Trailer unavailable
                </Typography>
              )}
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",

              gap: 1,

              flexWrap: "wrap",

              mt: 3,
            }}
          >
            {movie.genres.map((genre) => (
              <Chip
                key={genre.id}
                label={genre.name}
                variant="outlined"
                sx={{
                  color: theme.palette.text.primary,

                  borderColor: theme.palette.divider,
                }}
              />
            ))}
          </Box>

          <Typography
            sx={{
              mt: 3,

              mb: 3,

              maxWidth: 900,

              fontSize: "1.05rem",

              lineHeight: 1.7,
            }}
          >
            {movie.overview}
          </Typography>

          <Box
            sx={{
              maxWidth: 900,
            }}
          >
            <Divider
              sx={{
                borderColor: theme.palette.divider,
              }}
            />

            <Box
              sx={{
                display: "flex",

                gap: 3,

                py: 2,

                alignItems: "baseline",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,

                  minWidth: 64,
                }}
              >
                Cast
              </Typography>

              <Typography
                sx={{
                  color: "#5799EF",

                  lineHeight: 1.8,
                }}
              >
                {cast.map((actor) => actor.name).join(" · ")}
              </Typography>
            </Box>

            <Divider
              sx={{
                borderColor: theme.palette.divider,
              }}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default MovieDetails;

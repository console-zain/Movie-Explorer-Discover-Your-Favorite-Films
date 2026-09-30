import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  params: {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
  },
});

export const getTrendingMovies = async (page = 1) => {
  try {
    const response = await api.get("/trending/movie/week", {
      params: {
        page,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching trending movies:", error);

    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);

    return null;
  }
};

export const getMovieCredits = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/credits`);

    return response.data.cast;
  } catch (error) {
    console.error("Error fetching credits:", error);

    return [];
  }
};

export const getMovieVideos = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/videos`);

    return response.data.results;
  } catch (error) {
    console.error("Error fetching videos:", error);

    return [];
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get("/search/movie", {
      params: {
        query,
        page,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error searching movies:", error);

    return {
      results: [],
      page: 1,
      total_pages: 1,
    };
  }
};

export const getGenres = async () => {
  const response = await api.get("/genre/movie/list");

  return response.data.genres;
};

export default api;

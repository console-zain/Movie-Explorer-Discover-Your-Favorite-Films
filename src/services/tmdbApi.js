import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  params: {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
  },
});

export const getTrendingMovies = async () => {
  try {
    const response = await api.get("/trending/movie/week");

    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};

export default api;

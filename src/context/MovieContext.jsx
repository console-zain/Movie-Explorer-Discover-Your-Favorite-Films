import { createContext, useContext, useState } from "react";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  const [searchResults, setSearchResults] = useState([]);

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || [],
  );

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  return (
    <MovieContext.Provider
      value={{
        trendingMovies,
        setTrendingMovies,

        searchResults,
        setSearchResults,

        favorites,
        setFavorites,

        loading,
        setLoading,

        error,
        setError,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  return useContext(MovieContext);
};

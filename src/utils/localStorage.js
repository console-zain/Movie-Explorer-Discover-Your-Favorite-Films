export const getFavorites = () => {
  return JSON.parse(localStorage.getItem("favorites")) || [];
};

export const saveFavorites = (favorites) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

export const isFavorite = (movieId) => {
  const favorites = getFavorites();

  return favorites.some((movie) => movie.id === movieId);
};

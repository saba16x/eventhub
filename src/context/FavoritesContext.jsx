import { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext(null);
const STORAGE_KEY = 'eventhub_favorites_v1';

function readFavorites() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(readFavorites);

  const save = (items) => {
    setFavorites(items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  };

  const toggleFavorite = (event) => {
    const exists = favorites.some((item) => item.id === event.id);
    save(exists ? favorites.filter((item) => item.id !== event.id) : [...favorites, event]);
  };

  const removeFavorite = (eventId) => save(favorites.filter((item) => item.id !== eventId));
  const clearFavorites = () => save([]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, removeFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}

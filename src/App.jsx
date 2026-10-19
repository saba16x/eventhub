import { useEffect, useState } from 'react';
import { INITIAL_EVENTS } from './data/events.js';
import Navbar from './components/Navbar.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { FavoritesProvider, useFavorites } from './context/FavoritesContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import HomePage from './pages/HomePage.jsx';
import EventDetailsPage from './pages/EventDetailsPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

function AppShell() {
  const { favorites, toggleFavorite, removeFavorite, clearFavorites } = useFavorites();
  const [route, setRoute] = useState(window.location.hash.replace('#', '') || '/');

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash.replace('#', '') || '/');
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path) => {
    window.location.hash = path;
    setRoute(path);
  };

  const page = route.startsWith('/event/') ? (
    <EventDetailsPage
      eventId={route.replace('/event/', '')}
      events={INITIAL_EVENTS}
      navigate={navigate}
      favorites={favorites}
      toggleFavorite={toggleFavorite}
    />
  ) : route === '/favorites' ? (
    <FavoritesPage
      navigate={navigate}
      favorites={favorites}
      removeFavorite={removeFavorite}
      clearFavorites={clearFavorites}
    />
  ) : route.startsWith('/login') ? (
    <AuthPage navigate={navigate} isSignUpInitial={route.includes('signup=true')} />
  ) : route === '/profile' ? (
    <ProfilePage navigate={navigate} events={INITIAL_EVENTS} favorites={favorites} />
  ) : (
    <HomePage
      events={INITIAL_EVENTS}
      navigate={navigate}
      favorites={favorites}
      toggleFavorite={toggleFavorite}
    />
  );

  return (
    <div className="app-shell">
      <Navbar currentPath={route} navigate={navigate} favoritesCount={favorites.length} />
      <main className="page-container">{page}</main>
      <footer className="site-footer">
        <span className="brand-mark">E</span>
        <span>EventHub Platform</span>
        <span>© 2026. All rights reserved.</span>
        <nav>
          <button onClick={() => navigate('/')}>Home</button>
          <button onClick={() => navigate('/favorites')}>Favorites</button>
          <button onClick={() => navigate('/profile')}>Profile</button>
        </nav>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <ToastProvider>
          <AppShell />
        </ToastProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}

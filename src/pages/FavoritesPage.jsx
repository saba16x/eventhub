import { Compass, Heart } from 'lucide-react';
import { useToast } from '../context/ToastContext.jsx';
import EventCard from '../components/EventCard.jsx';

export default function FavoritesPage({ navigate, favorites, removeFavorite, clearFavorites }) {
  const { addToast } = useToast();
  const remove = (event) => { removeFavorite(event.id); addToast(`Removed ${event.title} from favorites`, 'info'); };

  return <div className="page-stack"><div className="results-heading page-title"><div><h1><Heart size={28} fill="currentColor" /> Saved favorites</h1><p>Keep track of the events you want to attend.</p></div>{favorites.length > 0 && <button className="button button-danger" onClick={() => { clearFavorites(); addToast('Favorites cleared', 'info'); }}>Clear all</button>}</div>{favorites.length ? <div className="event-grid">{favorites.map((event) => <EventCard key={event.id} event={event} onSelect={(id) => navigate(`/event/${id}`)} isFavorite onToggleFavorite={() => remove(event)} />)}</div> : <div className="empty-state"><Heart size={42} /><h2>Your favorites list is empty</h2><p>Save an event with the heart button to find it here.</p><button className="button button-primary" onClick={() => navigate('/')}><Compass size={17} /> Discover events</button></div>}</div>;
}

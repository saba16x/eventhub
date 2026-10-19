import { useMemo, useState } from 'react';
import { Search, Sparkles, Star } from 'lucide-react';
import { CATEGORIES } from '../data/events.js';
import { useToast } from '../context/ToastContext.jsx';
import EventCard from '../components/EventCard.jsx';

export default function HomePage({ events, navigate, favorites, toggleFavorite }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [price, setPrice] = useState('all');
  const [sort, setSort] = useState('upcoming');
  const { addToast } = useToast();

  const results = useMemo(() => events.filter((event) => {
    const query = search.toLowerCase();
    const matchesSearch = [event.title, event.description, event.location].some((value) => value.toLowerCase().includes(query));
    const matchesCategory = category === 'All' || event.category === category;
    const matchesPrice = price === 'all' || (price === 'free' ? event.isFree : !event.isFree);
    return matchesSearch && matchesCategory && matchesPrice;
  }).sort((a, b) => sort === 'popular' ? b.attendeesCount - a.attendeesCount : sort === 'title' ? a.title.localeCompare(b.title) : new Date(a.date) - new Date(b.date)), [events, search, category, price, sort]);

  const saveEvent = (event) => {
    const saved = favorites.some((item) => item.id === event.id);
    toggleFavorite(event);
    addToast(saved ? `Removed ${event.title} from favorites` : `Saved ${event.title} to favorites`, saved ? 'info' : 'success');
  };

  const featured = events.find((event) => event.featured) || events[0];

  return (
    <div className="page-stack">
      <section className="hero">
        <div className="hero-copy"><span className="eyebrow"><Sparkles size={15} /> Discover local and virtual gatherings</span><h1>Unforgettable events tailored to your passion.</h1><p>Explore, bookmark, and register for memorable experiences in your city and beyond.</p><div className="hero-stats"><span><b>1,200+</b> Events listed</span><span><b>50k+</b> Active attendees</span><span><b>4.9</b> User rating</span></div></div>
      </section>
      <section className="page-stack compact-stack"><div className="section-heading"><h2><Star size={20} fill="currentColor" /> Spotlight Event</h2></div><button className="featured-card" onClick={() => navigate(`/event/${featured.id}`)}><img src={featured.image} alt="" /><span><strong>{featured.title}</strong><small>{featured.description}</small><em>{featured.date} · {featured.location}</em></span></button></section>
      <section className="filters-panel">
        <label className="search-box"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search events, places, or topics" /></label>
        <select value={sort} onChange={(event) => setSort(event.target.value)}><option value="upcoming">Upcoming</option><option value="popular">Most popular</option><option value="title">Alphabetical</option></select>
        <select value={price} onChange={(event) => setPrice(event.target.value)}><option value="all">All prices</option><option value="free">Free events</option><option value="paid">Paid events</option></select>
      </section>
      <div className="category-list">{CATEGORIES.map((item) => <button className={category === item ? 'selected' : ''} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div>
      <div className="results-heading"><div><h2>Explore events</h2><p>{results.length} events match your filters</p></div></div>
      {results.length ? <div className="event-grid">{results.map((event) => <EventCard key={event.id} event={event} onSelect={(id) => navigate(`/event/${id}`)} isFavorite={favorites.some((item) => item.id === event.id)} onToggleFavorite={saveEvent} />)}</div> : <div className="empty-state"><h3>No events found</h3><p>Try another search or clear your filters.</p><button className="button button-primary" onClick={() => { setSearch(''); setCategory('All'); setPrice('all'); }}>Clear filters</button></div>}
    </div>
  );
}

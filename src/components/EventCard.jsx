import { CalendarDays, ChevronRight, Clock3, Heart, MapPin, Tag } from 'lucide-react';

export default function EventCard({ event, onSelect, isFavorite, onToggleFavorite }) {
  const date = new Date(`${event.date}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <article className="event-card">
      <div className="event-image-wrap">
        <img src={event.image} alt={event.title} className="event-image" loading="lazy" />
        <span className="category-label"><Tag size={13} /> {event.category}</span>
        <button className={`favorite-button ${isFavorite ? 'saved' : ''}`} onClick={() => onToggleFavorite(event)} aria-label={isFavorite ? 'Remove favorite' : 'Save favorite'}><Heart size={17} fill={isFavorite ? 'currentColor' : 'none'} /></button>
        <span className="price-label">{event.isFree ? 'FREE' : event.price}</span>
      </div>
      <div className="event-card-body">
        <div className="event-meta"><span><CalendarDays size={14} /> {date}</span><span><Clock3 size={14} /> {event.time.split(' - ')[0]}</span></div>
        <button className="event-title" onClick={() => onSelect(event.id)}>{event.title}</button>
        <p>{event.description}</p>
        <div className="event-card-footer"><span><MapPin size={14} /> {event.location}</span><button className="text-button" onClick={() => onSelect(event.id)}>Details <ChevronRight size={14} /></button></div>
      </div>
    </article>
  );
}

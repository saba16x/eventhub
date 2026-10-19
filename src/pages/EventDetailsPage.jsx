import { useState } from 'react';
import { ArrowLeft, CalendarDays, CheckCircle2, Clock3, Heart, MapPin, Share2, Ticket, Users, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function EventDetailsPage({ eventId, events, navigate, favorites, toggleFavorite }) {
  const event = events.find((item) => item.id === eventId);
  const { user, rsvps, rsvpEvent, cancelRsvp } = useAuth();
  const { addToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);

  if (!event) return <div className="empty-state"><h2>Event not found</h2><button className="button button-primary" onClick={() => navigate('/')}>Back to events</button></div>;

  const favorite = favorites.some((item) => item.id === event.id);
  const registered = rsvps.includes(event.id);
  const date = new Date(`${event.date}T12:00:00`).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const share = async () => {
    if (navigator.clipboard) await navigator.clipboard.writeText(window.location.href);
    addToast('Event link copied to clipboard', 'success');
  };
  const confirm = () => {
    if (!user) { addToast('Please sign in to register', 'error'); navigate('/login'); return; }
    rsvpEvent(event.id); setModalOpen(false); addToast(`You are registered for ${event.title}`, 'success');
  };

  return (
    <div className="page-stack detail-page"><button className="back-button" onClick={() => navigate('/')}><ArrowLeft size={17} /> Back to all events</button><section className="detail-hero"><img src={event.image} alt="" /><div><span className="eyebrow">{event.category}</span><h1>{event.title}</h1><p>Organized by {event.organizer}</p></div></section><div className="detail-layout"><article className="detail-content"><div className="detail-actions"><button className="button button-secondary" onClick={() => toggleFavorite(event)}><Heart size={17} fill={favorite ? 'currentColor' : 'none'} /> {favorite ? 'Saved' : 'Save event'}</button><button className="button button-secondary" onClick={share}><Share2 size={17} /> Share</button></div><div className="detail-facts"><span><CalendarDays size={18} /><b>Date</b>{date}</span><span><Clock3 size={18} /><b>Time</b>{event.time}</span><span><MapPin size={18} /><b>Location</b>{event.location}</span><span><Users size={18} /><b>Attendees</b>{event.attendeesCount.toLocaleString()}</span></div><h2>About this event</h2><p>{event.fullDescription}</p></article><aside className="ticket-card"><span className="eyebrow">Your ticket</span><h2>{event.isFree ? 'Free entry' : event.price}</h2><p>Reserve your place now and manage it from your profile.</p>{registered ? <button className="button button-danger full-width" onClick={() => { cancelRsvp(event.id); addToast('Registration cancelled', 'info'); }}><CheckCircle2 size={17} /> Cancel registration</button> : <button className="button button-primary full-width" onClick={() => setModalOpen(true)}><Ticket size={17} /> Reserve ticket</button>}</aside></div>{modalOpen && <div className="modal-backdrop"><div className="modal"><button className="modal-close" onClick={() => setModalOpen(false)}><X /></button><Ticket size={25} /><h2>Confirm registration</h2><p>{event.title}</p><div className="modal-summary"><span>{date}</span><span>{event.location}</span><span>{event.isFree ? 'Free entry' : event.price}</span></div><button className="button button-primary full-width" onClick={confirm}>Confirm ticket</button></div></div>}</div>
  );
}

import { useEffect } from 'react';
import { CalendarDays, Heart, LogOut, MapPin, Shield, Ticket, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function ProfilePage({ navigate, events, favorites }) {
  const { user, logout, rsvps, cancelRsvp } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    if (!user) { addToast('Please sign in to access your profile', 'error'); navigate('/login'); }
  }, [user, addToast, navigate]);

  if (!user) return null;
  const registrations = events.filter((event) => rsvps.includes(event.id));

  return <div className="page-stack"><section className="profile-header"><img src={user.avatar} alt="" /><div><h1>{user.name}</h1><p>{user.email}</p><span><Shield size={14} /> Member since {user.joinedDate}</span></div><button className="button button-danger" onClick={() => { logout(); addToast('Logged out successfully', 'info'); navigate('/'); }}><LogOut size={16} /> Sign out</button></section><div className="profile-grid"><section><div className="section-heading"><h2><Ticket size={20} /> My registrations</h2><span>{registrations.length} active</span></div>{registrations.length ? <div className="registration-list">{registrations.map((event) => <div className="registration" key={event.id}><img src={event.image} alt="" /><div><button onClick={() => navigate(`/event/${event.id}`)}>{event.title}</button><span><CalendarDays size={14} /> {event.date}</span><span><MapPin size={14} /> {event.location}</span></div><button className="icon-button" onClick={() => { cancelRsvp(event.id); addToast('Registration cancelled', 'info'); }} aria-label="Cancel registration"><X size={17} /></button></div>)}</div> : <div className="empty-state compact-empty"><p>You have not registered for any events yet.</p><button className="button button-primary" onClick={() => navigate('/')}>Browse events</button></div>}</section><section><div className="section-heading"><h2><Heart size={20} /> Favorites</h2><button className="text-button" onClick={() => navigate('/favorites')}>See all</button></div><div className="mini-favorites">{favorites.slice(0, 4).map((event) => <button key={event.id} onClick={() => navigate(`/event/${event.id}`)}><img src={event.image} alt="" /><span>{event.title}<small>{event.date}</small></span></button>)}{favorites.length === 0 && <p>No saved favorites yet.</p>}</div></section></div></div>;
}

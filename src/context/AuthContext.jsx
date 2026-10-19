import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);
const USER_KEY = 'eventhub_user_v1';
const RSVP_KEY = 'eventhub_rsvps_v1';

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStorage(USER_KEY, null));
  const [rsvps, setRsvps] = useState(() => readStorage(RSVP_KEY, []));

  const login = (email, name = 'Alex Johnson') => {
    const nextUser = {
      id: 'usr-101',
      name: name || email.split('@')[0],
      email,
      joinedDate: 'October 2026',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    };
    setUser(nextUser);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_KEY);
  };

  const rsvpEvent = (eventId) => {
    if (rsvps.includes(eventId)) return;
    const next = [...rsvps, eventId];
    setRsvps(next);
    localStorage.setItem(RSVP_KEY, JSON.stringify(next));
  };

  const cancelRsvp = (eventId) => {
    const next = rsvps.filter((id) => id !== eventId);
    setRsvps(next);
    localStorage.setItem(RSVP_KEY, JSON.stringify(next));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, rsvps, rsvpEvent, cancelRsvp }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

import { useState } from 'react';
import { Compass, LogIn, LogOut, Menu, User, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function Navbar({ currentPath, navigate, favoritesCount }) {
  const { user, logout } = useAuth();
  const { addToast } = useToast();
  const [open, setOpen] = useState(false);

  const go = (path) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    addToast('Logged out successfully', 'info');
    go('/');
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="brand" onClick={() => go('/')}>
          <span className="brand-icon"><Compass size={22} /></span>
          <span><strong>EventHub</strong><small>Discover & connect</small></span>
        </button>
        <nav className="desktop-nav">
          <button className={currentPath === '/' ? 'active' : ''} onClick={() => go('/')}>Explore Events</button>
          <button className={currentPath === '/favorites' ? 'active' : ''} onClick={() => go('/favorites')}>Favorites {favoritesCount > 0 && <b>{favoritesCount}</b>}</button>
          <button className={currentPath === '/profile' ? 'active' : ''} onClick={() => go('/profile')}>My Profile</button>
        </nav>
        <div className="auth-actions desktop-nav">
          {user ? (
            <>
              <button className="user-link" onClick={() => go('/profile')}><img src={user.avatar} alt="" />{user.name}</button>
              <button className="icon-button" onClick={handleLogout} aria-label="Log out"><LogOut size={18} /></button>
            </>
          ) : (
            <>
              <button onClick={() => go('/login')}><LogIn size={16} /> Sign In</button>
              <button className="button button-primary" onClick={() => go('/login?signup=true')}>Get Started</button>
            </>
          )}
        </div>
        <button className="mobile-menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <div className="mobile-nav">
          <button onClick={() => go('/')}>Explore Events</button>
          <button onClick={() => go('/favorites')}>Favorites {favoritesCount > 0 && <b>{favoritesCount}</b>}</button>
          <button onClick={() => go('/profile')}>My Profile</button>
          {user ? <button onClick={handleLogout}><LogOut size={16} /> Sign Out</button> : <button onClick={() => go('/login')}><User size={16} /> Sign In</button>}
        </div>
      )}
    </header>
  );
}

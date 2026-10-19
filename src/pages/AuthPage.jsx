import { useState } from 'react';
import { Eye, EyeOff, Lock, LogIn, Mail, User, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function AuthPage({ navigate, isSignUpInitial = false }) {
  const [signUp, setSignUp] = useState(isSignUpInitial);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const { addToast } = useToast();

  const submit = (event) => {
    event.preventDefault();
    if (!email || !password || (signUp && !name)) { addToast('Please fill in all required fields', 'error'); return; }
    login(email, signUp ? name : 'Alex Johnson');
    addToast(signUp ? `Welcome to EventHub, ${name}` : 'Welcome back to EventHub', 'success');
    navigate('/profile');
  };

  return <div className="auth-card"><div className="auth-icon">{signUp ? <UserPlus /> : <LogIn />}</div><h1>{signUp ? 'Create your account' : 'Welcome back'}</h1><p>{signUp ? 'Join EventHub to save and register for events.' : 'Sign in to manage your RSVPs and saved events.'}</p><form onSubmit={submit}>{signUp && <label><span><User size={15} /> Full name</span><input value={name} onChange={(event) => setName(event.target.value)} placeholder="Alex Johnson" /></label>}<label><span><Mail size={15} /> Email address</span><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="alex@example.com" /></label><label><span><Lock size={15} /> Password</span><div className="password-input"><input type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" /><button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></div></label><button className="button button-primary full-width" type="submit">{signUp ? 'Create account' : 'Sign in'}</button></form><button className="auth-toggle" onClick={() => setSignUp(!signUp)}>{signUp ? 'Already have an account? Sign in' : 'Need an account? Create one'}</button></div>;
}

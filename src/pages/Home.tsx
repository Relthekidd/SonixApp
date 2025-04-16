// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Removed unused imports from 'framer-motion'
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthProvider';
import { Music2, Eye, EyeOff, Mail } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      navigate('/explore');
    }
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data.user) {
      setError('Invalid credentials');
      setLoading(false);
      return;
    }

    navigate('/explore');
    setLoading(false);
  };

  return (
    <main className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md p-6 space-y-6 border shadow-lg rounded-xl border-white/10 bg-white/5">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Music2 className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Welcome to Sonix</h1>
          <p className="text-sm text-foreground/70">Login to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute w-5 h-5 -translate-y-1/2 left-3 top-1/2 text-foreground/50" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-2 pl-10 pr-4 border rounded-md bg-white/5 border-white/10"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-2 pl-10 pr-12 border rounded-md bg-white/5 border-white/10"
                placeholder="Your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute -translate-y-1/2 right-3 top-1/2"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="p-2 text-sm text-red-500 border rounded-md bg-red-500/10 border-red-500/20">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 font-semibold text-white transition rounded-md bg-primary hover:bg-primary/90"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Home;

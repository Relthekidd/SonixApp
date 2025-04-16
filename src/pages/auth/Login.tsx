// src/pages/auth/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Eye, EyeOff, Music2, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthProvider';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: identifier,
        password,
      });

      if (error || !data.user) throw error;

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profileError || !profile) throw profileError;

      if (profile.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (profile.role === 'artist') {
        navigate('/artist/dashboard');
      } else {
        navigate('/explore');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Music2 className="w-12 h-12 text-primary" />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
            />
          </div>
        </div>
        <h2 className="mb-2 text-3xl font-bold text-gradient">Welcome Back</h2>
        <p className="text-foreground/70">Sign in to continue your musical journey</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="identifier" className="block text-sm font-medium">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute w-5 h-5 -translate-y-1/2 left-4 top-1/2 text-foreground/50" />
              <input
                id="identifier"
                type="email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="w-full py-3 pr-4 transition-all duration-200 border pl-14 rounded-xl bg-white/5 border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full py-3 pr-12 transition-all duration-200 border pl-14 rounded-xl bg-white/5 border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute -translate-y-1/2 right-4 top-1/2 text-foreground/50 hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 text-sm text-red-500 border rounded-lg bg-red-500/10 border-red-500/20">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 font-medium text-white transition-all duration-200 rounded-xl bg-primary hover:bg-primary/90"
        >
          {loading ? <Loader2 className="w-5 h-5 mx-auto animate-spin" /> : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default Login;

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Music2, ArrowRight } from 'lucide-react';

const Welcome: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 text-center bg-background text-foreground">
      <div className="mb-8">
        <div className="relative mb-4">
          <Music2 className="w-16 h-16 text-primary" />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
          />
        </div>
        <h1 className="text-4xl font-bold text-gradient mb-2">Welcome to Sonix</h1>
        <p className="text-foreground/70 max-w-md mx-auto">
          Your personalized music streaming platform for listeners, artists, and admins.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors text-lg"
        >
          Login <ArrowRight className="w-5 h-5" />
        </Link>
        <Link
          to="/signup"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/5 text-foreground hover:bg-white/10 transition-colors text-lg"
        >
          Sign Up <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default Welcome;

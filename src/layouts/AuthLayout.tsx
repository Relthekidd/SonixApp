import React from 'react';
import { Outlet } from 'react-router-dom';
import { Music2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Music2 className="h-12 w-12 text-primary" />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
              />
            </div>
          </div>
          <Outlet />
        </div>
      </div>

      {/* Right Side - Decorative */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-background via-secondary/20 to-primary/20">
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-primary/10 rounded-full"
              style={{
                width: Math.random() * 300 + 50,
                height: Math.random() * 300 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-sm" />
        </div>

        <div className="relative h-full flex items-center justify-center p-12">
          <div className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl font-bold text-gradient mb-4">
                Your Music Journey
                <br />
                Starts Here
              </h1>
              <p className="text-xl text-foreground/70">
                Join millions of artists and listeners worldwide
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-8 max-w-xl mx-auto">
              <div className="glass p-6 rounded-2xl text-center">
                <h3 className="text-2xl font-bold mb-2">10M+</h3>
                <p className="text-foreground/70">Active Users</p>
              </div>
              <div className="glass p-6 rounded-2xl text-center">
                <h3 className="text-2xl font-bold mb-2">50M+</h3>
                <p className="text-foreground/70">Tracks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

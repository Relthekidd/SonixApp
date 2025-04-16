import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

type Role = 'listener' | 'artist' | 'admin' | 'super_admin';

interface UserProfile {
  id: string;
  email: string;
  username?: string;
  role: Role;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user) {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, full_name, role')
        .eq('id', session.user.id)
        .single();

      if (!error && data) {
        setUser({
          id: data.id,
          email: data.email,
          username: data.full_name,
          role: data.role as Role, // cast to Role type
        });
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchUserProfile();
    const { data: authListener } = supabase.auth.onAuthStateChange(() => fetchUserProfile());

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, loading, signOut }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

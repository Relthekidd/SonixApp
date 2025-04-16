import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('❌ Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: localStorage,
    storageKey: 'sonix-auth-token',
  },
  global: {
    headers: {
      'X-Client-Info': 'sonix-music-streaming',
    },
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// ✅ Optional: Basic auth state listener
supabase.auth.onAuthStateChange((event, session) => {
  console.log(`[auth] Event: ${event}`);

  if (event === 'SIGNED_IN') {
    console.log('✅ User signed in:', session?.user?.email);
  }

  if (event === 'SIGNED_OUT') {
    console.log('🔒 User signed out, clearing app data...');
    localStorage.removeItem('sonix-user-preferences');
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('sonix-')) {
        localStorage.removeItem(key);
      }
    });
  }
});

export default supabase;

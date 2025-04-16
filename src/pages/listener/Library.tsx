import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthProvider';
import { Loader } from 'lucide-react';

const Library: React.FC = () => {
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [recentTracks, setRecentTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const { data: playlistData, error: playlistError } = await supabase
          .from('playlists')
          .select('*')
          .eq('user_id', user?.id);

        if (playlistError) throw playlistError;

        const { data: recentData, error: recentError } = await supabase
          .from('recent_tracks')
          .select(`*, profiles ( username )`)
          .eq('user_id', user?.id);

        if (recentError) throw recentError;

        setPlaylists(playlistData || []);
        setRecentTracks(recentData || []);
      } catch (error) {
        console.error('Error loading library:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchLibrary();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Your Library</h1>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Playlists</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="p-3 rounded-lg bg-white/5">
              <p className="font-medium">{playlist.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Recently Played</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {recentTracks.map((track) => (
            <div key={track.id} className="p-3 rounded-lg bg-white/5">
              <p className="font-medium">{track.title}</p>
              <p className="text-sm text-foreground/70">{track.profiles?.username}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Library;

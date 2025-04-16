import React, { useState, useEffect } from 'react';
import { Play, Heart, Clock } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthProvider';

interface Track {
  id: string;
  title: string;
  cover_url: string;
  audio_url: string;
  created_at: string;
  profiles: {
    username: string;
  };
}

const LikedSongs: React.FC = () => {
  const { user } = useAuth();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikedTracks = async () => {
      try {
        const { data, error } = await supabase
          .from('libraries')
          .select(
            `
            tracks (
              id,
              title,
              cover_url,
              audio_url,
              created_at,
              profiles (
                username
              )
            )
          `
          )
          .eq('user_id', user?.id);

        if (error) throw error;

        const flattenedTracks = (data || []).map((item: any) => item.tracks).filter(Boolean);
        setTracks(flattenedTracks);
      } catch (error) {
        console.error('Error fetching liked tracks:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchLikedTracks();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-t-2 border-b-2 rounded-full animate-spin border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Liked Songs</h1>
          <p className="text-foreground/70">Your favorite tracks in one place</p>
        </div>
        {tracks.length > 0 && (
          <button className="px-6 py-2 transition-colors rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
            Play All
          </button>
        )}
      </div>

      {tracks.length > 0 ? (
        <div className="overflow-hidden rounded-lg bg-secondary/50">
          <div className="px-6 py-4 border-b border-white/10">
            <div className="grid grid-cols-[auto_1fr_auto] gap-4 text-sm font-medium text-foreground/70">
              <div className="w-8">#</div>
              <div>TITLE</div>
              <div className="w-20 text-right">
                <Clock className="inline-block w-4 h-4" />
              </div>
            </div>
          </div>
          <div className="divide-y divide-white/10">
            {tracks.map((track, index) => (
              <div
                key={track.id}
                className="px-6 py-4 grid grid-cols-[auto_1fr_auto] gap-4 items-center hover:bg-white/5 group"
              >
                <div className="w-8 text-foreground/70">{index + 1}</div>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={
                        track.cover_url ||
                        'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=50&h=50&fit=crop'
                      }
                      alt={track.title}
                      className="w-12 h-12 rounded-lg"
                    />
                    <button className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-black/40 group-hover:opacity-100">
                      <Play className="w-6 h-6 text-white" />
                    </button>
                  </div>
                  <div>
                    <div className="font-medium">{track.title}</div>
                    <div className="text-sm text-foreground/70">{track.profiles.username}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="text-primary">
                    <Heart className="w-5 h-5 fill-primary" />
                  </button>
                  <span className="w-16 text-sm text-right text-foreground/70">3:45</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="py-12 text-center">
          <Heart className="w-16 h-16 mx-auto mb-4 text-foreground/30" />
          <h3 className="mb-2 text-xl font-medium">No liked songs yet</h3>
          <p className="text-foreground/70">Start liking songs to build your collection</p>
        </div>
      )}
    </div>
  );
};

export default LikedSongs;

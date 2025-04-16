import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Play, Pause, Heart, Clock } from 'lucide-react';
import { useAudioPreview } from '../hooks/useAudioPreview';

interface Track {
  id: string;
  title: string;
  artist_name: string;
  cover_url: string;
  audio_url: string;
  duration: string;
  genre: string;
}

const ForYou: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const { playPreview, stopPreview, isPlaying, currentTrack } = useAudioPreview();

  useEffect(() => {
    const fetchRecommendations = async () => {
      // TODO: Replace with actual user-tailored recommendations
      const { data, error } = await supabase
        .from('tracks')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(8);

      if (error) console.error(error.message);
      if (data) setTracks(data);
      setLoading(false);
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Recommended For You</h2>

      {loading ? (
        <p className="text-white/60">Loading your recommendations...</p>
      ) : tracks.length === 0 ? (
        <p className="text-white/60">No suggestions available right now.</p>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {tracks.map((track) => (
            <div
              key={track.id}
              onMouseEnter={() => playPreview(track.audio_url)}
              onMouseLeave={stopPreview}
              className="overflow-hidden transition-all group rounded-xl bg-white/5 hover:shadow-xl"
            >
              <div className="relative aspect-square">
                <img
                  src={track.cover_url}
                  alt={track.title}
                  className="object-cover w-full h-full"
                />
                {currentTrack === track.audio_url && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-white" />
                    ) : (
                      <Play className="w-6 h-6 text-white" />
                    )}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{track.title}</h3>
                <p className="text-sm text-foreground/70">{track.artist_name}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-foreground/50">
                  <Clock className="w-4 h-4" />
                  <span>{track.duration}</span>
                  <span className="w-1 h-1 rounded-full bg-foreground/30" />
                  <span>{track.genre}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ForYou;

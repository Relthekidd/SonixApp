import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, MoreHorizontal, Clock, Heart, Share2, Shuffle, Music, Plus } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Track {
  id: string;
  title: string;
  cover_url: string;
  duration: string;
  profiles: {
    username: string;
  };
}

interface Playlist {
  id: string;
  name: string;
  description: string | null;
  cover_url: string | null;
  track_count: number;
  created_at: string;
  profiles: {
    username: string;
  };
}

const Playlist: React.FC = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        // Fetch playlist details
        const { data: playlistData, error: playlistError } = await supabase
          .from('playlists')
          .select(
            `
            *,
            profiles (
              username
            )
          `
          )
          .eq('id', id)
          .single();

        if (playlistError) throw playlistError;
        setPlaylist(playlistData);

        // Fetch playlist tracks
        const { data: trackData, error: trackError } = await supabase
          .from('playlist_tracks')
          .select(
            `
            tracks (
              id,
              title,
              cover_url,
              duration,
              profiles (
                username
              )
            )
          `
          )
          .eq('playlist_id', id)
          .order('position');

        if (trackError) throw trackError;
        setTracks(trackData?.map((item) => item.tracks) || []);
      } catch (error) {
        console.error('Error fetching playlist:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPlaylist();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="text-center py-12">
        <Music className="w-16 h-16 mx-auto text-foreground/30 mb-4" />
        <h3 className="text-xl font-medium mb-2">Playlist not found</h3>
        <p className="text-foreground/70">This playlist might have been deleted or is private</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Playlist Header */}
      <div className="flex gap-8">
        <div className="w-48 h-48 relative group">
          {playlist.cover_url ? (
            <img
              src={playlist.cover_url}
              alt={playlist.name}
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <div className="w-full h-full bg-secondary/50 rounded-xl flex items-center justify-center">
              <Music className="w-16 h-16 text-foreground/30" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
            <button className="p-4 bg-primary rounded-full transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <Play className="w-6 h-6 fill-primary-foreground" />
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-end">
          <h4 className="text-sm font-medium text-foreground/70">PLAYLIST</h4>
          <h1 className="text-4xl font-bold mt-2">{playlist.name}</h1>
          {playlist.description && (
            <p className="text-foreground/70 mt-2">{playlist.description}</p>
          )}
          <div className="flex items-center gap-4 mt-6">
            <button className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-full hover:bg-primary/90 transition-colors">
              <Play className="w-5 h-5 fill-primary-foreground" />
              <span>Play</span>
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <Shuffle className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Tracks List */}
      <div className="bg-secondary/50 rounded-xl">
        <div className="px-6 py-4 border-b border-white/10">
          <div className="grid grid-cols-[auto_1fr_auto] gap-4 text-sm font-medium text-foreground/70">
            <div className="w-8">#</div>
            <div>TITLE</div>
            <div className="w-20 text-right">
              <Clock className="w-4 h-4 inline-block" />
            </div>
          </div>
        </div>
        <div className="divide-y divide-white/10">
          {tracks.length > 0 ? (
            tracks.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
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
                    <button className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                      <Play className="w-6 h-6 text-white" />
                    </button>
                  </div>
                  <div>
                    <div className="font-medium">{track.title}</div>
                    <div className="text-sm text-foreground/70">{track.profiles.username}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="text-foreground/70 hover:text-primary transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <span className="text-sm text-foreground/70 w-16 text-right">
                    {track.duration}
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="p-8 text-center">
              <Music className="w-12 h-12 mx-auto text-foreground/30 mb-4" />
              <h3 className="font-medium mb-2">No tracks yet</h3>
              <p className="text-sm text-foreground/70 mb-4">
                Start adding tracks to your playlist
              </p>
              <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors mx-auto">
                <Plus className="w-5 h-5" />
                <span>Add Tracks</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Playlist;

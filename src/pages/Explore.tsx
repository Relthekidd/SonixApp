import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Mic,
  TrendingUp,
  Play,
  Pause,
  Heart,
  Music2,
  Radio,
  Headphones,
  Sparkles,
  Clock,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
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

const categories = [
  { id: 'for-you', name: 'For You', icon: Headphones },
  { id: 'trending', name: 'Trending', icon: TrendingUp },
  { id: 'new', name: 'New Drops', icon: Music2 },
  { id: 'radio', name: 'Your Station', icon: Radio },
  { id: 'gems', name: 'Underground Gems', icon: Sparkles },
];

const moods = ['Energetic', 'Chill', 'Focus', 'Workout', 'Party', 'Sleep'];

const Explore: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeCategory, setActiveCategory] = useState('for-you');
  const [activeMood, setActiveMood] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  const { playPreview, stopPreview, isPlaying, currentTrack } = useAudioPreview();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTracks = async () => {
      const { data, error } = await supabase
        .from('tracks')
        .select('id, title, artist_name, cover_url, audio_url, duration, genre')
        .order('created_at', { ascending: false })
        .limit(20);

      if (data) setTracks(data);
      if (error) console.error('Error fetching tracks:', error.message);

      setLoading(false);
    };

    fetchTracks();
  }, []);

  const handleSearch = (query: string) => {
    setIsSearching(true);
    const filtered = tracks.filter(
      (track) =>
        track.title.toLowerCase().includes(query.toLowerCase()) ||
        track.artist_name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
    setTimeout(() => setIsSearching(false), 400);
  };

  const handleTrackHover = (track: Track, isHovering: boolean) => {
    if (isHovering) {
      playPreview(track.audio_url);
    } else {
      stopPreview();
    }
  };

  return (
    <div className="p-6 space-y-10">
      {/* Search Section */}
      <div className="relative max-w-3xl mx-auto" ref={searchRef}>
        <div
          className={`relative rounded-xl transition-all ${searchFocused ? 'ring-2 ring-primary/50' : 'bg-secondary/20'}`}
        >
          <Search className="absolute w-5 h-5 -translate-y-1/2 left-4 top-1/2 text-foreground/50" />
          <input
            type="text"
            placeholder="Search tracks or artists..."
            className="w-full py-4 pl-12 bg-transparent pr-14 focus:outline-none"
            onFocus={() => setSearchFocused(true)}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button className="absolute p-2 -translate-y-1/2 rounded-lg right-4 top-1/2 bg-primary/10 text-primary hover:bg-primary/20">
            <Mic className="w-4 h-4" />
          </button>
        </div>

        <AnimatePresence>
          {searchFocused && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute w-full mt-4 bg-background rounded-xl shadow-lg p-4 max-h-[300px] overflow-y-auto"
            >
              {isSearching ? (
                <div className="text-center text-foreground/60">Searching...</div>
              ) : searchResults.length > 0 ? (
                searchResults.map((track) => (
                  <div
                    key={track.id}
                    className="flex items-center gap-3 p-3 cursor-pointer hover:bg-white/5"
                    onMouseEnter={() => handleTrackHover(track, true)}
                    onMouseLeave={() => handleTrackHover(track, false)}
                  >
                    <img src={track.cover_url} alt={track.title} className="w-12 h-12 rounded-md" />
                    <div>
                      <h4 className="font-medium">{track.title}</h4>
                      <p className="text-sm text-foreground/60">{track.artist_name}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-foreground/70">No results found</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map(({ id, name, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveCategory(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              activeCategory === id
                ? 'bg-primary text-white'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            <Icon className="w-4 h-4" />
            {name}
          </button>
        ))}
      </div>

      {/* Mood Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        {moods.map((mood) => (
          <button
            key={mood}
            onClick={() => setActiveMood(mood === activeMood ? null : mood)}
            className={`px-4 py-2 text-sm rounded-full transition-all ${
              mood === activeMood
                ? 'bg-primary text-white'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            {mood}
          </button>
        ))}
      </div>

      {/* Track Grid */}
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
        {loading ? (
          <p className="text-center col-span-full text-white/60">Loading tracks...</p>
        ) : tracks.length === 0 ? (
          <p className="text-center col-span-full text-white/60">No tracks available.</p>
        ) : (
          tracks.map((track) => (
            <div
              key={track.id}
              onMouseEnter={() => handleTrackHover(track, true)}
              onMouseLeave={() => handleTrackHover(track, false)}
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
                  {track.duration}
                  <span className="w-1 h-1 rounded-full bg-foreground/30" />
                  {track.genre}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Explore;

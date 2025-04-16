import { useState, useRef, useEffect } from 'react';

export function useAudioPreview() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playPreview = (audioUrl: string) => {
    if (!audioRef.current) return;

    if (currentTrack === audioUrl && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (currentTrack !== audioUrl) {
        audioRef.current.src = audioUrl;
        setCurrentTrack(audioUrl);
      }
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const stopPreview = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  return {
    playPreview,
    stopPreview,
    isPlaying,
    currentTrack,
  };
}

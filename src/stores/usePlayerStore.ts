import { create } from 'zustand';

type Track = {
  id: string;
  title: string;
  artist: string;
  audio: string;
  cover: string;
  duration?: number;
};

type PlayerStore = {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  progress: number;
  setTrack: (track: Track) => void;
  togglePlay: (playState?: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setProgress: (progress: number) => void;
  clearTrack: () => void;
};

export const usePlayerStore = create<PlayerStore>((set) => ({
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  progress: 0,

  setTrack: (track) =>
    set({
      currentTrack: track,
      isPlaying: true,
      currentTime: 0,
      duration: track.duration || 0,
      progress: 0,
    }),

  togglePlay: (playState) =>
    set((state) => ({
      isPlaying: playState !== undefined ? playState : !state.isPlaying,
    })),

  setCurrentTime: (time) =>
    set({
      currentTime: time,
    }),

  setDuration: (duration) =>
    set({
      duration,
    }),

  setProgress: (progress) =>
    set({
      progress,
    }),

  clearTrack: () =>
    set({
      currentTrack: null,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      progress: 0,
    }),
}));

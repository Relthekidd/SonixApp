import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import WaveSurfer from 'wavesurfer.js';
import { usePlayerStore } from '../../stores/usePlayerStore';

const MusicPlayer: React.FC = () => {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const waveSurfer = useRef<WaveSurfer | null>(null);

  const {
    currentTrack,
    isPlaying,
    togglePlay,
    setCurrentTime,
    setDuration,
    setProgress,
    duration,
  } = usePlayerStore();

  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [progress, localSetProgress] = useState(0); // For waveform seek bar visuals
  const [time, setTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  useEffect(() => {
    if (waveformRef.current && currentTrack?.audio) {
      waveSurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#ccc',
        progressColor: '#4f46e5',
        cursorColor: '#4f46e5',
        barWidth: 2,
        height: 50,
      });

      waveSurfer.current.load(currentTrack.audio);

      waveSurfer.current.on('ready', () => {
        const trackDuration = waveSurfer.current?.getDuration() || 0;
        setDuration(trackDuration);
      });

      waveSurfer.current.on('audioprocess', () => {
        const current = waveSurfer.current?.getCurrentTime() || 0;
        const trackDuration = waveSurfer.current?.getDuration() || 1;
        setTime(current);
        setCurrentTime(current);
        const prog = current / trackDuration;
        localSetProgress(prog);
        setProgress(prog);
      });

      waveSurfer.current.on('finish', () => {
        if (isRepeat) {
          waveSurfer.current?.seekTo(0);
          waveSurfer.current?.play();
        } else {
          togglePlay(false);
        }
      });
    }

    const handleResize = () => {
      if (waveSurfer.current && waveformRef.current) {
        const containerWidth = waveformRef.current.clientWidth || 0;
        (waveSurfer.current as any).drawer.containerWidth = containerWidth;
        (waveSurfer.current as any).drawer.drawBuffer();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      waveSurfer.current?.destroy();
      window.removeEventListener('resize', handleResize);
    };
  }, [currentTrack?.audio]);

  useEffect(() => {
    if (waveSurfer.current) {
      isPlaying ? waveSurfer.current.play() : waveSurfer.current.pause();
    }
  }, [isPlaying]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    waveSurfer.current?.setVolume(value);
    setIsMuted(value === 0);
  };

  const handleProgressClick = (e: React.MouseEvent) => {
    if (!waveformRef.current) return;

    const rect = waveformRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const newProgress = x / width;

    localSetProgress(newProgress);
    setProgress(newProgress);
    waveSurfer.current?.seekTo(newProgress); // Correct usage for WaveSurfer.js v7
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!currentTrack) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        className={`fixed ${
          isFullscreen
            ? 'inset-0 z-50 bg-background/95 backdrop-blur-lg'
            : 'bottom-0 left-0 right-0 h-24 bg-background/60 backdrop-blur-xl'
        } border-t border-white/10 shadow-2xl`}
      >
        {/* Progress Bar / Waveform */}
        <div
          ref={waveformRef}
          onClick={handleProgressClick}
          className="relative h-1 bg-secondary/20 cursor-pointer"
        >
          <motion.div
            className="absolute top-0 left-0 h-full bg-primary"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div className="flex items-center justify-between px-4 py-3">
          {/* Track Info */}
          <div className="flex items-center gap-4">
            <img
              src={currentTrack.cover}
              alt={currentTrack.title}
              className="w-16 h-16 rounded-lg shadow-md"
            />
            <div>
              <h4 className="text-sm font-medium">{currentTrack.title}</h4>
              <p className="text-xs text-foreground/70">{currentTrack.artist}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              <SkipBack className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => togglePlay()}
              className="bg-primary rounded-full p-4 hover:bg-primary/90 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-primary-foreground" />
              ) : (
                <Play className="w-6 h-6 text-primary-foreground ml-1" />
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              <SkipForward className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Volume, Shuffle, Repeat, Fullscreen */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsShuffle(!isShuffle)}
              className={`transition-colors ${isShuffle ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}`}
            >
              <Shuffle className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsRepeat(!isRepeat)}
              className={`transition-colors ${isRepeat ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}`}
            >
              <Repeat className="w-5 h-5" />
            </motion.button>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMuted(!isMuted)}
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </motion.button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-24"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </motion.button>
            <div className="text-xs text-foreground/70">
              {formatTime(time)} / {formatTime(duration)}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MusicPlayer;

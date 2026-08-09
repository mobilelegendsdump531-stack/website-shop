'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX, Play, Pause, SkipBack, SkipForward, Shuffle, Repeat2 } from 'lucide-react';
import { Song, Playlist } from '@/types';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { cn } from '@/utils/helpers';

interface MusicPlayerProps {
  playlist?: Playlist;
  songs?: Song[];
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ playlist, songs = [] }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const playlistSongs = playlist?.songs?.map((ps) => ps.song) || songs || [];
  const currentSong = playlistSongs[currentSongIndex];

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    if (currentSongIndex < playlistSongs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else if (repeatMode === 'all') {
      setCurrentSongIndex(0);
    }
  };

  const handlePrevious = () => {
    if (currentTime > 3) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    } else if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time: number) => {
    if (!time) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card variant="glass" className="p-6 space-y-4">
      {/* Current Song Info */}
      {currentSong && (
        <div className="text-center space-y-2">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">{currentSong.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{currentSong.artist}</p>
        </div>
      )}

      {/* Progress Bar */}
      <div className="space-y-2">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleTimeChange}
          className="w-full h-1 bg-gray-300 dark:bg-gray-700 rounded-lg cursor-pointer accent-neon-cyan"
        />
        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-2">
        {/* Shuffle */}
        <Button
          variant="ghost"
          size="md"
          onClick={() => setShuffle(!shuffle)}
          className={cn(shuffle && 'text-neon-cyan')}
        >
          <Shuffle size={20} />
        </Button>

        {/* Previous */}
        <Button variant="ghost" size="md" onClick={handlePrevious}>
          <SkipBack size={20} />
        </Button>

        {/* Play/Pause */}
        <Button
          variant="primary"
          size="lg"
          onClick={handlePlayPause}
          className="rounded-full w-12 h-12 flex items-center justify-center"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </Button>

        {/* Next */}
        <Button variant="ghost" size="md" onClick={handleNext}>
          <SkipForward size={20} />
        </Button>

        {/* Repeat */}
        <Button
          variant="ghost"
          size="md"
          onClick={() => {
            const modes: Array<'off' | 'all' | 'one'> = ['off', 'all', 'one'];
            const currentIndex = modes.indexOf(repeatMode);
            setRepeatMode(modes[(currentIndex + 1) % modes.length]);
          }}
          className={cn(repeatMode !== 'off' && 'text-neon-cyan')}
        >
          <Repeat2 size={20} />
        </Button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            setIsMuted(!isMuted);
            if (audioRef.current) {
              audioRef.current.volume = isMuted ? volume / 100 : 0;
            }
          }}
          className="text-gray-600 dark:text-gray-400 hover:text-neon-cyan transition-colors"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="flex-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-lg cursor-pointer accent-neon-cyan"
        />
        <span className="text-xs text-gray-600 dark:text-gray-400 w-8 text-right">{volume}%</span>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentSong?.url}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onEnded={handleNext}
      />
    </Card>
  );
};

export default MusicPlayer;

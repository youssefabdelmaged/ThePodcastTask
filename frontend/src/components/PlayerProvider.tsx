"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { Episode, FeaturedEpisode, PlayerState } from "@/types";

interface PlayerContextValue {
  playerState: PlayerState;
  playEpisode: (episode: Episode | FeaturedEpisode) => void;
  togglePlayPause: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  previous: () => void;
  next: () => void;
  shuffle: () => void;
  repeat: () => void;
}

const defaultState: PlayerState = {
  currentEpisode: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
};

const PlayerContext = createContext<PlayerContextValue | undefined>(undefined);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [playerState, setPlayerState] = useState<PlayerState>(defaultState);

  const parseDuration = useCallback((duration: string): number => {
    const parts = duration?.split(":") || [];
    if (parts.length === 2) return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    if (parts.length === 3)
      return (
        parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2])
      );
    return 0;
  }, []);

  const playEpisode = useCallback(
    (episode: Episode | FeaturedEpisode) => {
      setPlayerState((prev) => ({
        ...prev,
        currentEpisode: episode,
        isPlaying: true,
        currentTime: 0,
        duration: parseDuration((episode as Episode).duration || "0"),
      }));
    },
    [parseDuration]
  );

  const togglePlayPause = useCallback(() => {
    setPlayerState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
  }, []);

  const seek = useCallback((time: number) => {
    setPlayerState((prev) => ({ ...prev, currentTime: time }));
  }, []);

  const setVolume = useCallback((volume: number) => {
    setPlayerState((prev) => ({ ...prev, volume }));
  }, []);

  const previous = useCallback(() => {}, []);
  const next = useCallback(() => {}, []);
  const shuffle = useCallback(() => {}, []);
  const repeat = useCallback(() => {}, []);

  const value = useMemo<PlayerContextValue>(
    () => ({
      playerState,
      playEpisode,
      togglePlayPause,
      seek,
      setVolume,
      previous,
      next,
      shuffle,
      repeat,
    }),
    [
      playerState,
      playEpisode,
      togglePlayPause,
      seek,
      setVolume,
      previous,
      next,
      shuffle,
      repeat,
    ]
  );

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}

export function usePlayer(): PlayerContextValue {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within a PlayerProvider");
  return ctx;
}

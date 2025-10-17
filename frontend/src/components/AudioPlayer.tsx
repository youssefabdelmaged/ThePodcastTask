"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePlayer } from "./PlayerProvider";

// ======== Subcomponents ========

// 1️⃣ Header
function PlayerHeader() {
  return (
    <div className="flex justify-center items-center space-x-2">
      <Image src="/assets/Headphone.svg" alt="Now Playing" width={32} height={32} />
      <span className="text-white text-base font-medium">Tocando agora</span>
    </div>
  );
}

// 2️⃣ Player Content
function PlayerContent({ episode }: { episode: any }) {
  if (!episode) {
    return (
      <div className="w-[320px] h-[360px] border-[1.5px] border-dashed rounded-[24px] flex items-center justify-center text-white">
        <p className="font-lexend font-semibold text-lg text-center px-4">
          Selecione um podcast para ouvir
        </p>
      </div>
    );
  }

  return (
    <div
      className="w-[320px] h-[360px] rounded-[24px] flex flex-col items-center justify-center gap-4 p-4"
      style={{
        background:
          "linear-gradient(143.8deg, rgba(145, 100, 250, 0.8) 0%, rgba(145, 100, 250, 0) 100%)",
        borderColor: "#9F75FF",
        borderWidth: 1.5,
        borderStyle: "dashed",
      }}
    >
      <Image
        src={episode.thumbnail}
        alt={episode.title}
        width={200}
        height={200}
        className="w-48 h-48 object-cover rounded-xl"
      />
      <div className="text-center px-2">
        <p className="text-white font-lexend font-semibold text-base line-clamp-2">
          {episode.title}
        </p>
        <p className="text-white/80 font-inter text-sm line-clamp-1">{episode.hosts}</p>
      </div>
    </div>
  );
}

// 3️⃣ Progress Bar
function ProgressBar({
  currentTime,
  duration,
  onSeek,
  formatTime,
}: {
  currentTime: number;
  duration: number;
  onSeek: (e: React.MouseEvent<HTMLDivElement>) => void;
  formatTime: (t: number) => string;
}) {
  return (
    <div className="mb-4 relative">
      <div className="relative flex items-center justify-between gap-4">
        <span className="text-white text-sm">{formatTime(currentTime)}</span>

        <div className="flex-1 mx-4 relative cursor-pointer" onClick={onSeek}>
          <div className="w-full h-1.5 rounded-full bg-purple-400/50" />
          <div
            className="absolute top-0 h-1.5 rounded-full bg-gray-700 transition-all duration-300"
            style={{
              width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
            }}
          />
          <div
            className="absolute top-[-2px] w-3 h-3 rounded-full bg-white border-4 border-green-400 transition-all duration-300"
            style={{
              left: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
              transform: "translateX(-50%)",
            }}
          />
        </div>

        <span className="text-white text-sm">{formatTime(duration)}</span>
      </div>
    </div>
  );
}

// 4️⃣ Player Controls
function PlayerControls({
  isPlaying,
  togglePlay,
  previous,
  next,
  shuffle,
  repeat,
}: {
  isPlaying: boolean;
  togglePlay: () => void;
  previous: () => void;
  next: () => void;
  shuffle: () => void;
  repeat: () => void;
}) {
  return (
    <div className="flex items-center justify-center space-x-6">
      <button onClick={shuffle}>
        <Image src="/assets/Group.png" alt="Shuffle" width={24} height={24} />
      </button>

      <button onClick={previous}>
        <Image src="/assets/play-previous.svg" alt="Previous" width={24} height={24} />
      </button>

      <button
        onClick={togglePlay}
        className="w-12 h-12 flex items-center justify-center bg-purple-500 rounded-2xl"
      >
        <Image
          src={isPlaying ? "/assets/Union.png" : "/assets/Vector.png"}
          alt={isPlaying ? "Pause" : "Play"}
          width={24}
          height={24}
        />
      </button>

      <button onClick={next}>
        <Image src="/assets/play-next.svg" alt="Next" width={24} height={24} />
      </button>

      <button onClick={repeat}>
        <Image src="/assets/repeat.svg" alt="Repeat" width={24} height={24} />
      </button>
    </div>
  );
}

// ======== Main Player Component ========

export default function AudioPlayer() {
  const { playerState, togglePlayPause, seek, previous, next, shuffle, repeat } = usePlayer();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const formatTime = (t: number) => {
    if (isNaN(t)) return "00:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Handle progress
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      seek?.(audio.currentTime);
    };
    const handleLoaded = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoaded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoaded);
    };
  }, [seek]);

  // Sync play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    playerState.isPlaying ? audio.play().catch(() => {}) : audio.pause();
  }, [playerState.isPlaying]);

  // Load episode source
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const src = playerState.currentEpisode?.audioUrl || "";
    if (audio.src !== src) {
      audio.src = src;
      audio.load();
      setCurrentTime(0);
      if (playerState.isPlaying) audio.play().catch(() => {});
    }
  }, [playerState.currentEpisode, playerState.isPlaying]);

  // Handle seek
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Toggle mobile fullscreen
  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden md:flex w-96 flex-col h-screen bg-purple-600">
        <div className="flex-1 flex justify-center items-center">
          <PlayerHeader />
        </div>
        <div className="flex-1 flex justify-center items-center">
          <PlayerContent episode={playerState.currentEpisode} />
        </div>
        <div className="flex-1 flex flex-col justify-center p-8">
          <ProgressBar
            currentTime={currentTime}
            duration={duration}
            onSeek={handleSeek}
            formatTime={formatTime}
          />
          <PlayerControls
            isPlaying={playerState.isPlaying}
            togglePlay={togglePlayPause}
            previous={previous}
            next={next}
            shuffle={shuffle}
            repeat={repeat}
          />
        </div>
        <audio ref={audioRef} />
      </div>

      {/* Mobile Floating Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleFullScreen}
          className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
        >
          <Image src="/assets/Headphone.svg" alt="Audio Player" width={24} height={24} />
        </button>
      </div>

      {/* Mobile Fullscreen Overlay */}
      {isFullScreen && (
        <div className="md:hidden fixed inset-0 bg-purple-600 z-50 flex flex-col">
          <div className="flex justify-end p-6">
            <button
              onClick={toggleFullScreen}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex justify-center items-center">
            <PlayerHeader />
          </div>

          <div className="flex-1 flex justify-center items-center">
            <PlayerContent episode={playerState.currentEpisode} />
          </div>

          <div className="px-6 mb-6">
            <ProgressBar
              currentTime={currentTime}
              duration={duration}
              onSeek={handleSeek}
              formatTime={formatTime}
            />
          </div>

          <div className="flex items-center justify-center pb-8">
            <PlayerControls
              isPlaying={playerState.isPlaying}
              togglePlay={togglePlayPause}
              previous={previous}
              next={next}
              shuffle={shuffle}
              repeat={repeat}
            />
          </div>

          <audio ref={audioRef} />
        </div>
      )}
    </>
  );
}

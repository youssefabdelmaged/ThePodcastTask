"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function AudioPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Format seconds → mm:ss
  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  // Handle play/pause toggle
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Update progress as song plays
  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    };

    if (audio) {
      audio.addEventListener("timeupdate", updateProgress);
      audio.addEventListener("loadedmetadata", updateProgress);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", updateProgress);
        audio.removeEventListener("loadedmetadata", updateProgress);
      }
    };
  }, []);

  // Handle user seeking (clicking progress bar)
  const handleSeek = (e) => {
    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Toggle full screen mode
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <>
      {/* Desktop Player - Hidden on small screens */}
      <div
        className="hidden md:block w-96 flex flex-col h-screen lg:h-screen"
        style={{ backgroundColor: "#8257E5" }}
      >
        {/* Header */}
        <div className="flex-1 flex justify-center items-center p-8 pb-4">
          <div className="flex items-center space-x-2">
            <Image
              src="/assets/Headphone.svg"
              alt="Now Playing"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span
              className="text-white font-medium"
              style={{
                fontSize: "16px",
                lineHeight: "20px",
              }}
            >
              Tocando agora
            </span>
          </div>
        </div>

        {/* Player Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 py-25">
          <div
            className="w-[320px] h-[360px] border-[1.5px] border-dashed rounded-[24px] flex items-center justify-center"
            style={{
              background:
                "linear-gradient(143.8deg, rgba(145, 100, 250, 0.8) 0%, rgba(145, 100, 250, 0) 100%)",
              borderColor: "#9F75FF",
            }}
          >
            <p
              className="text-center text-white"
              style={{
                fontFamily: "Lexend",
                fontWeight: 600,
                fontSize: "18px",
                lineHeight: "22px",
              }}
            >
              Selecione um podcast para ouvir
            </p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex-1 flex flex-col justify-center p-8 pt-8">
          {/* AUDIO ELEMENT */}
          <audio
            ref={audioRef}
            src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          />

          {/* Progress Bar */}
          <div className="mb-4 relative">
            <div className="relative flex items-center justify-between gap-4">
              {/* Left time */}
              <span
                className="text-white absolute left-0 mr-2"
                style={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "17px",
                }}
              >
                {formatTime(currentTime)}
              </span>

              {/* Progress track container */}
              <div className="flex-1 mx-8 relative">
                {/* Background track */}
                <div
                  className="w-full h-1.5 rounded-[10px]"
                  style={{
                    backgroundColor: "#9F75FF",
                    opacity: 0.5,
                  }}
                />
                {/* Progress fill - only visible when playing */}
                <div
                  className="absolute top-0 h-1.5 rounded-[10px] transition-all duration-300"
                  style={{
                    backgroundColor: "#444",
                    width: `${
                      isPlaying && duration > 0
                        ? (currentTime / duration) * 100
                        : 0
                    }%`,
                    visibility:
                      isPlaying && duration > 0 ? "visible" : "hidden",
                  }}
                />
                {/* Progress handle - only visible when playing */}
                <div
                  className="absolute top-[-2px] w-3 h-3 rounded-full border-4 border-solid transition-all duration-300"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#04D361",
                    left: `${
                      isPlaying && duration > 0
                        ? (currentTime / duration) * 100
                        : 0
                    }%`,
                    transform: "translateX(-50%)",
                    visibility:
                      isPlaying && duration > 0 ? "visible" : "hidden",
                  }}
                />
              </div>

              {/* Right time */}
              <span
                className="text-white absolute right-0 ml-2"
                style={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "17px",
                }}
              >
                {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex-1 flex items-center justify-center space-x-6">
          <button className="text-white hover:text-gray-300 transition-colors">
            <Image
              src="/assets/Group.png"
              alt="Shuffle"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </button>

          <button className="text-white hover:text-gray-300 transition-colors">
            <Image
              src="/assets/play-previous.svg"
              alt="Previous"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </button>

          <button
            onClick={togglePlay}
            className="w-12 h-12 flex items-center justify-center transition-colors"
            style={{
              backgroundColor: "#9164FA",
              borderRadius: "16px",
            }}
          >
            {isPlaying ? (
              <Image
                src="/assets/Union.png"
                alt="Pause"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            ) : (
              <Image
                src="/assets/Vector.png"
                alt="Play"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            )}
          </button>

          <button className="text-white hover:text-gray-300 transition-colors">
            <Image
              src="/assets/play-next.svg"
              alt="Next"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </button>

          <button className="text-white hover:text-gray-300 transition-colors">
            <Image
              src="/assets/repeat.svg"
              alt="Repeat"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>

      {/* Mobile Floating Circle Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleFullScreen}
          className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
        >
          <Image
            src="/assets/Headphone.svg"
            alt="Audio Player"
            width={24}
            height={24}
            className="w-6 h-6 text-white"
          />
        </button>
      </div>

      {/* Mobile Full Screen Overlay */}
      {isFullScreen && (
        <div className="md:hidden fixed inset-0 bg-purple-600 z-50 flex flex-col">
          {/* Close Button */}
          <div className="flex justify-end p-6">
            <button
              onClick={toggleFullScreen}
              className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Player Header */}
          <div className="flex justify-center items-center px-6">
            <div className="flex items-center space-x-2">
              <Image
                src="/assets/Headphone.svg"
                alt="Now Playing"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span
                className="text-white font-medium"
                style={{
                  fontSize: "16px",
                  lineHeight: "20px",
                }}
              >
                Tocando agora
              </span>
            </div>
          </div>

          {/* Player Content */}
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <div
              className="w-full max-w-sm h-80 border-[1.5px] border-dashed rounded-[24px] flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(143.8deg, rgba(145, 100, 250, 0.8) 0%, rgba(145, 100, 250, 0) 100%)",
                borderColor: "#9F75FF",
              }}
            >
              <p
                className="text-center text-white px-4"
                style={{
                  fontFamily: "Lexend",
                  fontWeight: 600,
                  fontSize: "18px",
                  lineHeight: "22px",
                }}
              >
                Selecione um podcast para ouvir
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="px-6 mb-6">
            <div className="relative flex items-center justify-between gap-4">
              {/* Left time */}
              <span
                className="text-white text-sm"
                style={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "17px",
                }}
              >
                {formatTime(currentTime)}
              </span>

              {/* Progress track container */}
              <div className="flex-1 mx-4 relative">
                {/* Background track */}
                <div
                  className="w-full h-1.5 rounded-[10px]"
                  style={{
                    backgroundColor: "#9F75FF",
                    opacity: 0.5,
                  }}
                />
                {/* Progress fill - only visible when playing */}
                <div
                  className="absolute top-0 h-1.5 rounded-[10px] transition-all duration-300"
                  style={{
                    backgroundColor: "#444",
                    width: `${
                      isPlaying && duration > 0
                        ? (currentTime / duration) * 100
                        : 0
                    }%`,
                    visibility:
                      isPlaying && duration > 0 ? "visible" : "hidden",
                  }}
                />
                {/* Progress handle - only visible when playing */}
                <div
                  className="absolute top-[-2px] w-3 h-3 rounded-full border-4 border-solid transition-all duration-300"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#04D361",
                    left: `${
                      isPlaying && duration > 0
                        ? (currentTime / duration) * 100
                        : 0
                    }%`,
                    transform: "translateX(-50%)",
                    visibility:
                      isPlaying && duration > 0 ? "visible" : "hidden",
                  }}
                />
              </div>

              {/* Right time */}
              <span
                className="text-white text-sm"
                style={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "17px",
                }}
              >
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-center space-x-6 pb-8">
            <button className="text-white hover:text-gray-300 transition-colors">
              <Image
                src="/assets/Group.png"
                alt="Shuffle"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </button>

            <button className="text-white hover:text-gray-300 transition-colors">
              <Image
                src="/assets/play-previous.svg"
                alt="Previous"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </button>

            <button
              onClick={togglePlay}
              className="w-12 h-12 flex items-center justify-center transition-colors"
              style={{
                backgroundColor: "#9164FA",
                borderRadius: "16px",
              }}
            >
              {isPlaying ? (
                <Image
                  src="/assets/Union.png"
                  alt="Pause"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              ) : (
                <Image
                  src="/assets/Vector.png"
                  alt="Play"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              )}
            </button>

            <button className="text-white hover:text-gray-300 transition-colors">
              <Image
                src="/assets/play-next.svg"
                alt="Next"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </button>

            <button className="text-white hover:text-gray-300 transition-colors">
              <Image
                src="/assets/repeat.svg"
                alt="Repeat"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </button>
          </div>

          {/* AUDIO ELEMENT */}
          <audio
            ref={audioRef}
            src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          />
        </div>
      )}
    </>
  );
}

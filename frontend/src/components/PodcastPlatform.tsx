"use client";
import { useState, useEffect } from "react";

import { Episode, FeaturedEpisode } from "../types";
import FeaturedEpisodes from "./FeaturedEpisodes";
import EpisodesTable from "./EpisodesTable";
import Header from "./Header";
import Image from "next/image";
import { usePlayer } from "./PlayerProvider";
import { fetchFeaturedEpisodes, fetchEpisodes } from "../api/podcasts";

const PodcastPlatform = () => {
  const [featuredEpisodes, setFeaturedEpisodes] = useState<FeaturedEpisode[]>(
    []
  );
  const [allEpisodes, setAllEpisodes] = useState<Episode[]>([]);
  const { playerState, playEpisode, togglePlayPause } = usePlayer();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPodcastData();
  }, []);

  const loadPodcastData = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      // Fetch featured episodes and all episodes in parallel
      const [featuredResponse, episodesResponse] = await Promise.all([
        fetchFeaturedEpisodes(),
        fetchEpisodes({ page: 1, limit: 20 }),
      ]);

      setFeaturedEpisodes(featuredResponse);
      setAllEpisodes(episodesResponse.items);
      setLoading(false);
    } catch (error) {
      console.error("Error loading podcast data:", error);
      setError(
        "Falha ao carregar os episódios. Verifique sua conexão e tente novamente."
      );
      setLoading(false);
    }
  };

  const handlePlayEpisode = (episode: Episode | FeaturedEpisode): void => {
    playEpisode(episode);
  };

  const handlePlayPause = (): void => {
    togglePlayPause();
  };

  const handleSeek = (_time: number): void => {};

  const handleVolumeChange = (_volume: number): void => {};

  const handlePrevious = (): void => {};

  const handleNext = (): void => {};

  const handleShuffle = (): void => {};

  const handleRepeat = (): void => {};

  const parseDuration = (_duration: string): number => 0;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background-main">
      {/* Main Content */}
      {/* <div className="flex-1 flex flex-col"> */}

      {/* Main Content Area */}
      <main className="flex-1 py-8 sm:py-12">
        {loading ? (
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="space-y-8">
              {/* Loading skeleton for featured episodes */}
              <div className="space-y-6">
                <div className="h-8 bg-secondary-light rounded animate-pulse w-64" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-32 bg-secondary-light rounded-xl animate-pulse"
                    />
                  ))}
                </div>
              </div>

              {/* Loading skeleton for episodes table */}
              <div className="space-y-6">
                <div className="h-8 bg-secondary-light rounded animate-pulse w-48" />
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="h-16 bg-secondary-light rounded animate-pulse"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4">
                <svg
                  className="w-16 h-16 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-text-primary mb-2">
                Oops! Algo deu errado
              </h2>
              <p className="text-text-secondary mb-4 max-w-md">{error}</p>
              <button
                onClick={loadPodcastData}
                className="px-4 py-2 bg-button-primary text-text-white rounded-md hover:bg-button-primary-hover transition-colors"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Featured Episodes */}
            <FeaturedEpisodes
              episodes={featuredEpisodes}
              onPlayEpisode={handlePlayEpisode}
            />

            {/* Episodes Table */}
            <EpisodesTable
              episodes={allEpisodes}
              onPlayEpisode={handlePlayEpisode}
            />
          </>
        )}
      </main>
      {/* </div> */}

      {/* Player Sidebar is handled globally in Root layout */}

      {/* Mobile Player - Shown only on mobile when episode is playing */}
      {playerState.currentEpisode && (
        <div className="block lg:hidden fixed bottom-3 left-3 right-3 bg-background-accent/95 p-4 border border-border-secondary rounded-xl shadow-lg">
          <div className="flex items-center gap-4">
            <Image
              src={playerState.currentEpisode.thumbnail}
              alt={playerState.currentEpisode.title}
              width={48}
              height={48}
              className="w-12 h-12 object-cover rounded-sm"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-lexend font-semibold text-text-white line-clamp-1">
                {playerState.currentEpisode.title}
              </h3>
              <p className="text-xs font-inter text-text-light line-clamp-1">
                {playerState.currentEpisode.hosts}
              </p>
            </div>
            <button
              onClick={handlePlayPause}
              className="p-2 text-text-white hover:text-text-light transition-colors"
              aria-label={playerState.isPlaying ? "Pause" : "Play"}
            >
              <Image
                src="/assets/img_play_arrow.png"
                alt={playerState.isPlaying ? "Pause" : "Play"}
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PodcastPlatform;

"use client";
import { useState, useEffect } from "react";

import { Episode, FeaturedEpisode } from "../types";
import FeaturedEpisodes from "./FeaturedEpisodes";
import EpisodesTable from "./EpisodesTable";
import Header from "./Header";
import Image from "next/image";
import { usePlayer } from "./PlayerProvider";

const PodcastPlatform = () => {
  const [featuredEpisodes, setFeaturedEpisodes] = useState<FeaturedEpisode[]>(
    []
  );
  const [allEpisodes, setAllEpisodes] = useState<Episode[]>([]);
  const { playerState, playEpisode, togglePlayPause } = usePlayer();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPodcastData();
  }, []);

  const loadPodcastData = async (): Promise<void> => {
    try {
      // Simulate API call with dummy data
      setTimeout(() => {
        const featured: FeaturedEpisode[] = [
          {
            id: "1",
            title: "O que é um bom código?",
            hosts: "Diego e Richard",
            date: "8 Jan 21",
            duration: "1:35:18",
            thumbnail: "/assets/thumbnail.png",
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          },
          {
            id: "2",
            title: "Como começar na programação...",
            hosts: "Tiago, Diego e Pellizzetti",
            date: "8 Jan 21",
            duration: "35:40",
            thumbnail: "/assets/thumbnail.png",
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          },
        ];

        const episodes: Episode[] = [
          {
            id: "3",
            title: "A vida é boa",
            hosts: "Tiago, Diego e Pellizzetti",
            date: "8 Jan 21",
            duration: "1:35:18",
            thumbnail: "/assets/thumbnail.png",
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
          },
          {
            id: "4",
            title: "Como programar like a god",
            hosts: "Maria, Tiago e Samuel",
            date: "7 Jan 21",
            duration: "35:40",
            thumbnail: "/assets/thumbnail.png",
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
          },
          {
            id: "5",
            title: "Bora viver!",
            hosts: "Diego e Richard",
            date: "12 Fev 21",
            duration: "54:27",
            thumbnail: "/assets/thumbnail.png",
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
          },
          {
            id: "6",
            title: "Não desista de você",
            hosts: "Pelpas, Pulili, Pepe e Pupa",
            date: "24 Mar 21",
            duration: "1:27:11",
            thumbnail: "/assets/thumbnail.png",
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
          },
          {
            id: "7",
            title: "A vida é incrível",
            hosts: "B1 e B2 descendo as escadas",
            date: "25 Mar 21",
            duration: "1:35:18",
            thumbnail: "/assets/thumbnail.png",
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
          },
        ];

        setFeaturedEpisodes(featured);
        setAllEpisodes(episodes);
        setLoading(false);
      }, 1000);
    } catch (_error) {
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
        <div className="block lg:hidden fixed bottom-0 left-0 right-0 bg-background-accent p-4 border-t border-border-secondary">
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

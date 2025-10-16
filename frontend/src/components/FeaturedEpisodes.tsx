"use client";
import { useState } from "react";
import IconButton from "@/ui/IconButton";
import type { FeaturedEpisode } from "@/types";
import Image from "next/image";

interface FeaturedEpisodesProps {
  episodes: FeaturedEpisode[];
  onPlayEpisode: (episode: FeaturedEpisode) => void;
}

const FeaturedEpisodes = ({
  episodes,
  onPlayEpisode,
}: FeaturedEpisodesProps) => {
  const [hoveredEpisode, setHoveredEpisode] = useState<string | null>(null);

  return (
    <section className="w-full">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex flex-col gap-6 sm:gap-8">
          {/* Section Title */}
          <h2 className="text-lg sm:text-xl lg:text-[24px] font-lexend font-semibold leading-extra text-text-primary">
            Ultimos lançamentos
          </h2>

          {/* Episodes Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {episodes.map((episode) => (
              <div
                key={episode.id}
                className="flex flex-col sm:flex-row items-start gap-4 p-4 sm:p-5 bg-background-card border border-border-primary rounded-xl hover:shadow-lg transition-all duration-200"
                onMouseEnter={() => setHoveredEpisode(episode.id)}
                onMouseLeave={() => setHoveredEpisode(null)}
              >
                {/* Episode Thumbnail */}
                <div className="flex-shrink-0 w-full sm:w-24 lg:w-24">
                  <Image
                    width={96}
                    height={96}
                    src={episode.thumbnail}
                    alt={episode.title}
                    className="w-full sm:w-[96px] h-[200px] sm:h-[96px] object-cover rounded-lg"
                  />
                </div>

                {/* Episode Content */}
                <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
                  <div className="flex-1 space-y-3 sm:space-y-4">
                    {/* Episode Title */}
                    <h3 className="text-base font-lexend font-semibold leading-loose text-text-primary line-clamp-2">
                      {episode.title}
                    </h3>

                    {/* Episode Meta */}
                    <div className="space-y-2">
                      <p className="text-sm font-inter font-normal leading-relaxed text-text-secondary">
                        {episode.hosts}
                      </p>

                      <div className="flex items-center gap-2">
                        <span className="text-sm font-inter font-normal leading-relaxed text-text-secondary">
                          {episode.date}
                        </span>
                        <div className="w-1 h-1 bg-background-neutral rounded-full" />
                        <span className="text-sm font-inter font-normal leading-relaxed text-text-secondary">
                          {episode.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Play Button */}
                  <div className="flex-shrink-0 self-center sm:self-start">
                    <IconButton
                      src="/assets/img_play_arrow.png"
                      variant="secondary"
                      size="large"
                      border_border_radius="rounded-md"
                      fill_background_color="bg-background-card"
                      className={`border border-border-primary transition-all duration-200 ${
                        hoveredEpisode === episode.id
                          ? "scale-105 shadow-md"
                          : ""
                      }`}
                      onClick={() => onPlayEpisode(episode)}
                      aria-label={`Play ${episode.title}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEpisodes;

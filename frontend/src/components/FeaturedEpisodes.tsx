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
  const [hoveredEpisode, setHoveredEpisode] = useState<string | number | null>(
    null
  );

  return (
    <section className="w-full">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex flex-col gap-6 sm:gap-8">
          {/* Section Title */}
          <h2 className="text-lg sm:text-xl lg:text-[24px] font-lexend font-semibold leading-extra text-text-primary">
            Ultimos lançamentos
          </h2>

          {/* Episodes Grid - stacks to single column on small screens */}
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-6 justify-items-center">
            {episodes.map((episode) => (
              <div
                key={episode.title}
                className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4 p-3 sm:p-5 bg-background-card border border-[#E6E8EB] rounded-[24px] shadow-sm hover:shadow-md transition-all duration-200 lg:w-[480px] lg:h-[150px]"
                onMouseEnter={() => setHoveredEpisode(episode.id)}
                onMouseLeave={() => setHoveredEpisode(null)}
              >
                {/* Episode Thumbnail */}
                <div className="relative  w-full h-28 sm:w-24 sm:h-24 lg:w-28 lg:h-28">
                  <Image
                    fill
                    sizes="(max-width: 640px) 95vw, (max-width: 1024px) 50vw, 300px"
                    src={episode.thumbnail}
                    alt={episode.title}
                    className="object-cover rounded-[16px]"
                    priority={false}
                  />
                </div>

                {/* Episode Content */}
                <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
                  <div className="flex-1 space-y-1.5 sm:space-y-4">
                    {/* Episode Title */}
                    <h3 className="text-[12px] sm:text-[16px] font-lexend font-semibold leading-[20px] text-text-primary line-clamp-2">
                      {episode.title}
                    </h3>

                    {/* Episode Meta */}
                    <div className="space-y-2">
                      <p className="text-[12px] sm:text-[14px] font-inter font-normal leading-[17px] text-text-secondary">
                        {episode.hosts}
                      </p>

                      <div className="flex items-center gap-2">
                        <span className="text-[12px] sm:text-[14px] font-inter font-normal leading-[17px] text-text-secondary">
                          {episode.date}
                        </span>
                        <div className="w-1 h-1 bg-background-neutral rounded-full" />
                        <span className="text-[12px] sm:text-[14px] font-inter font-normal leading-[17px] text-text-secondary">
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
                      size="medium"
                      border_border_radius="rounded-[10px]"
                      fill_background_color="bg-background-card"
                      className={`border border-[#E6E8EB] transition-all duration-200 ${
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

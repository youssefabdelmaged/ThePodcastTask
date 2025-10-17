"use client";
import { useState } from "react";
import IconButton from "@/ui/IconButton";
import type { Episode } from "@/types";
import Image from "next/image";

interface EpisodesTableProps {
  episodes: Episode[];
  onPlayEpisode: (episode: Episode) => void;
}

const EpisodesTable = ({ episodes, onPlayEpisode }: EpisodesTableProps) => {
  const [hoveredEpisode, setHoveredEpisode] = useState<string | number | null>(
    null
  );

  return (
    <section className="w-full mt-12 sm:mt-16">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex flex-col gap-8">
          {/* Section Title */}
          <h2 className="text-lg sm:text-xl lg:text-[24px] font-lexend font-semibold leading-extra text-text-primary">
            Todos os episódios
          </h2>

          {/* Table Container */}
          <div className="w-full overflow-x-auto lg:overflow-x-visible">
            <table
              className="w-full min-w-[960px] xl:min-w-[1100px]"
              role="table"
            >
              {/* Table Header */}
              <thead>
                <tr className="border-b border-border-primary">
                  <th className="text-left pb-3">
                    <span className="text-xs font-lexend font-normal leading-tight text-text-muted uppercase">
                      Podcast
                    </span>
                  </th>
                  <th className="text-left pb-3 hidden sm:table-cell">
                    <span className="text-xs font-lexend font-normal leading-tight text-text-accent uppercase">
                      Integrantes
                    </span>
                  </th>
                  <th className="text-left pb-3 hidden md:table-cell">
                    <span className="text-xs font-lexend font-normal leading-tight text-text-muted uppercase">
                      Data
                    </span>
                  </th>
                  <th className="text-left pb-3 hidden lg:table-cell">
                    <span className="text-xs font-lexend font-normal leading-tight text-text-muted uppercase">
                      Duração
                    </span>
                  </th>
                  <th className="w-16"></th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {episodes.map((episode, index) => (
                  <tr
                    key={episode.title}
                    className={`border-b border-border-primary hover:bg-secondary-light transition-colors duration-200 ${
                      index === episodes.length - 1 ? "border-b-0" : ""
                    }`}
                    onMouseEnter={() => setHoveredEpisode(episode.id)}
                    onMouseLeave={() => setHoveredEpisode(null)}
                  >
                    {/* Podcast Column */}
                    <td className="py-3 sm:py-4">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <Image
                          width={20}
                          height={20}
                          src={episode.thumbnail}
                          alt={episode.title}
                          className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-sm"
                        />
                        <span className="text-sm sm:text-base font-lexend font-semibold leading-loose text-text-primary line-clamp-1">
                          {episode.title}
                        </span>
                      </div>
                    </td>

                    {/* Hosts Column - Hidden on mobile */}
                    <td className="py-3 sm:py-4 hidden sm:table-cell">
                      <span className="text-sm font-inter font-normal leading-relaxed text-text-secondary">
                        {episode.hosts}
                      </span>
                    </td>

                    {/* Date Column - Hidden on mobile and small tablets */}
                    <td className="py-3 sm:py-4 hidden md:table-cell">
                      <span className="text-sm font-inter font-normal leading-relaxed text-text-secondary">
                        {episode.date}
                      </span>
                    </td>

                    {/* Duration Column - Hidden on mobile, small tablets, and medium tablets */}
                    <td className="py-3 sm:py-4 hidden lg:table-cell">
                      <span className="text-sm font-inter font-normal leading-relaxed text-text-secondary">
                        {episode.duration}
                      </span>
                    </td>

                    {/* Play Button Column */}
                    <td className="py-3 sm:py-4">
                      <div className="flex justify-end">
                        <IconButton
                          src="/assets/img_play_arrow.png"
                          variant="secondary"
                          size="medium"
                          border_border_radius="rounded-sm"
                          fill_background_color="bg-button-secondary"
                          className={`border border-border-primary transition-all duration-200 ${
                            hoveredEpisode === episode.id ? "scale-105" : ""
                          }`}
                          onClick={() => onPlayEpisode(episode)}
                          aria-label={`Play ${episode.title}`}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile-friendly episode info - Shown only on mobile (more compact) */}
          <div className="block sm:hidden space-y-3">
            {episodes.map((episode) => (
              <div
                key={`m${episode.title}`}
                className="flex items-center justify-between p-3 bg-background-card border border-border-primary rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Image
                    width={56}
                    height={56}
                    src={episode.thumbnail}
                    alt={episode.title}
                    className="w-14 h-14 object-cover rounded-md"
                  />
                  <div className="space-y-1">
                    <h3 className="text-sm font-lexend font-semibold leading-snug text-text-primary line-clamp-1">
                      {episode.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                      <span>{episode.hosts}</span>
                      <div className="w-1 h-1 bg-background-neutral rounded-full" />
                      <span>{episode.date}</span>
                      <div className="w-1 h-1 bg-background-neutral rounded-full" />
                      <span>{episode.duration}</span>
                    </div>
                  </div>
                </div>
                <IconButton
                  src="/assets/img_play_arrow.png"
                  variant="ghost"
                  size="small"
                  onClick={() => onPlayEpisode(episode)}
                  aria-label={`Play ${episode.title}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EpisodesTable;

"use client";

import useRadioToggle from "@/hooks/useRadioToggle";

import usePlayer from "@/stores/usePlayer";
import { useEffect, useState } from "react";
import { ExploreEpisode } from "@/types/shows";
import { PhPlayFill, PhStopFill } from "@/components/Icons";

interface PlayPauseExploreEpisodeToggleProps {
  data: ExploreEpisode;
}

const PlayPauseExploreEpisodeToggle: React.FC<
  PlayPauseExploreEpisodeToggleProps
> = ({ data }) => {
  const { toggleRadio } = useRadioToggle();
  const { activePlayer } = usePlayer();

  const [isPlaying, setIsPlaying] = useState(false);

  const episodePathname = data.article.path.split("/").pop()

  useEffect(() => {
    if (
      activePlayer?.stationName === episodePathname &&
      activePlayer.pause === false
    ) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [activePlayer, data]);

  return (
    <button
      className="absolute top-0 flex h-full w-full items-end transition lg:items-center lg:justify-center lg:bg-black/50  lg:opacity-0 lg:group-hover:opacity-100 "
      onClick={() => {
        toggleRadio({
          stationName: episodePathname!,
          type: "episode",
          source: data.audio_sources[0].url,
          sourceType: data.audio_sources[0].source,
          info: {
            image: data.image.small,
            date: data.local_date,
            name: data.title,
            tracklist: data.article.path,
            source: data.audio_sources,
          },
        });
      }}
    >
      <div className="bg-white px-5 py-2 lg:bg-transparent">
        {isPlaying ? (
          <PhStopFill className="h-9 w-9 text-black lg:h-12 lg:w-12 lg:text-white" />
        ) : (
          <PhPlayFill className="h-9 w-9 text-black lg:h-12 lg:w-12 lg:text-white" />
        )}
      </div>
    </button>
  );
};

export default PlayPauseExploreEpisodeToggle;

"use client";

import useRadioToggle from "@/hooks/useRadioToggle";
import { PhPlayFill, PhStopFill } from "./Icons";
import usePlayer from "@/stores/usePlayer";
import { useEffect, useState } from "react";
import { Episode } from "@/types/shows";
import { ShortShow } from "@/types/general";
import { useDate } from "@/lib/utils";

interface PlayPauseToggleProps {
  episodeData: Episode
  showData: ShortShow
}

const PlayPauseToggle: React.FC<PlayPauseToggleProps> = ({
  episodeData,
  showData
}) => {
  const { toggleRadio } = useRadioToggle();
  const { activePlayer } = usePlayer();

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (
      activePlayer?.stationName === episodeData?.episode_alias &&
      activePlayer.pause === false
    ) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [activePlayer, episodeData]);

  const info = {
    image: episodeData.media.picture_small,
    date: useDate(episodeData.updated),
    name: episodeData.name,
    tracklist: `/shows/${episodeData.show_alias}/episodes/${episodeData.episode_alias}`,
    source: episodeData.audio_sources,
    showData: {
      showName: showData.showName,
      showAlias: showData.showAlias,
      showImage: showData.showImage,
    },
  };

  return (
      <button
        className="absolute top-0 flex h-full w-full items-end transition lg:items-center lg:justify-center lg:bg-black/50  lg:opacity-0 lg:group-hover:opacity-100 "
        onClick={() => {
          toggleRadio({
            stationName: episodeData.episode_alias,
            type: "episode",
            source: episodeData.audio_sources[0].url,
            sourceType: episodeData.audio_sources[0].source,
            info: info
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

export default PlayPauseToggle;

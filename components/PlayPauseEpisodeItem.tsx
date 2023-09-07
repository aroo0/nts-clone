"use client";

import useRadioToggle from "@/hooks/useRadioToggle";
import { PhPlayFill, PhStopFill } from "./Icons";
import usePlayer from "@/stores/usePlayer";
import { useEffect, useState } from "react";
import { Episode } from "@/types/shows";

interface PlayPauseToggleProps {
  data: Episode
}

const PlayPauseToggle: React.FC<PlayPauseToggleProps> = ({
  data
}) => {
  const { toggleRadio } = useRadioToggle();
  const { activePlayer } = usePlayer();

  const [isPlaying, setIsPlaying] = useState(false);


  useEffect(() => {
    if (
      activePlayer?.stationName === data?.episode_alias &&
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
            stationName: data.episode_alias,
            type: "episode",
            source: data.audio_sources[0].url,
            sourceType: data.audio_sources[0].source,
            info: {
              image: data.media.picture_small,
              date: data.updated,
              name: data.name,
              tracklist: `/shows/${data.show_alias}/episodes/${data.episode_alias}`,
              source: data.audio_sources

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

export default PlayPauseToggle;

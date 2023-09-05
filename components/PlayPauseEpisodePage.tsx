"use client";

import useRadioToggle from "@/hooks/useRadioToggle";
import { PhPlayFill, PhStopFill } from "./Icons";
import usePlayer from "@/stores/usePlayer";
import { useEffect, useState } from "react";
import { Episode } from "@/types/shows";

interface PlayPauseEpisodePageProps {
  data: Episode
}

const PlayPauseEpisodePage: React.FC<PlayPauseEpisodePageProps> = ({
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
      <button className="text-black"
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
          {isPlaying ? (
            <PhStopFill className="h-10 w-10 " />
          ) : (
            <PhPlayFill className="h-10 w-10 " />
          )}
      </button>
  );
};

export default PlayPauseEpisodePage;

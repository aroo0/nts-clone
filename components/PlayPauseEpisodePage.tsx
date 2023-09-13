"use client";

import useRadioToggle from "@/hooks/useRadioToggle";
import { PhPlayFill, PhStopFill } from "./Icons";
import usePlayer from "@/stores/usePlayer";
import { useEffect, useState } from "react";
import { Episode } from "@/types/shows";
import { ShortShow } from "@/types/general";

interface PlayPauseEpisodePageProps {
  episodeData: Episode;
  showData: ShortShow;

}

const PlayPauseEpisodePage: React.FC<PlayPauseEpisodePageProps> = ({
  episodeData,
  showData,

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
    date: episodeData.updated,
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
      className="text-black"
      onClick={() => {
        toggleRadio({
          stationName: episodeData.episode_alias,
          type: "episode",
          source: episodeData.audio_sources[0].url,
          sourceType: episodeData.audio_sources[0].source,
          info: info,
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

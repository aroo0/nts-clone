import usePlayer from "@/stores/usePlayer";
import { useEffect, useState } from "react";

function useAudioLoadingState() {
  const { activeHowl, setIsLoadingAudio, activePlayer } = usePlayer()

  useEffect(() => {
    if (activeHowl) {
      const onStateChange = () => {
        setIsLoadingAudio(activeHowl.state());

      };

      activeHowl.on("load", onStateChange);
      activeHowl.on("play", onStateChange);
      activeHowl.on("pause", onStateChange);
      activeHowl.on("stop", onStateChange);

      return () => {
        activeHowl.off("load", onStateChange);
        activeHowl.off("play", onStateChange);
        activeHowl.off("pause", onStateChange);
        activeHowl.off("stop", onStateChange);
      };
    }
  }, [activeHowl]);
  
  return activePlayer.isLoadingAudio


}

export default useAudioLoadingState;
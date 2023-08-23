
import usePlayer from "@/stores/usePlayer";
import { useState, useEffect } from "react";


function useRadioToggle(stationName: string) {
  const { activePlayer, setActivePlayer, reset } = usePlayer();


  const toggleRadio = () => {
    if (activePlayer === stationName) {
      reset();
    } else {
      reset();
      setActivePlayer(stationName);
    }
  };

  return {
    toggleRadio,
  };
}

export default useRadioToggle;

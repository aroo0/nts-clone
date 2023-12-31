import { STATION1_STREAM_URL, STATION2_STREAM_URL } from "@/const/api";
import usePlayer from "@/stores/usePlayer";
import { toggleRadioParams } from "@/types/general";
// @ts-ignore
import { Howl } from "howler";

interface Stations {
  [id: string]: string;
}

function useRadioToggle() {
  const {
    activePlayer,
    activeHowl,
    setActivePlayer,
    reset,
    setActiveHowl,
    setPause,
  } = usePlayer();

  const stations: Stations = {
    "1": STATION1_STREAM_URL,
    "2": STATION2_STREAM_URL,
  };

  const initRadio = (source: string) => {
    const howl = new Howl({
      src: source,
      html5: true,
      volume: 0.5,
    });
    setActiveHowl(howl);
    howl.play();
  };

  const stopRadio = () => {
    activeHowl.unload();
    reset();
  };

  const togglePause = () => {
    if (!activePlayer.pause) {
      activeHowl.pause();
      setPause(true);
    } else {
      activeHowl.play();
      setPause(false);
    }
  };

  const toggleRadio = async ({
    stationName,
    type,
    source,
    info,
  }: toggleRadioParams) => {

    if (activePlayer.stationName === stationName) {
      if (stationName in stations) {
        stopRadio();
      }

      togglePause();
    } else {
      if (activePlayer.stationName) {
        stopRadio();
      }
      setActivePlayer({ stationName, info, type });

      if (!source) {
        source = stations[stationName];
      }

      initRadio(source);
    }
  };

  return {
    toggleRadio,
    stopRadio,
    togglePause,
  };
}

export default useRadioToggle;

import { STATION1_STREAM_URL, STATION2_STREAM_URL } from "@/const/api";
import usePlayer from "@/stores/usePlayer";
// @ts-ignore
import { Howl } from "howler";

interface Stations {
  [id: string]: string;
}

function useRadioToggle() {
  const { activePlayer, activeHowl, setActivePlayer, reset, setActiveHowl } =
    usePlayer();

  const stations: Stations = {
    "1": STATION1_STREAM_URL,
    "2": STATION2_STREAM_URL,
  };

  const initRadio = (stationId: string) => {
    const src = stations[stationId];
    const howl = new Howl({
      src: src,
      html5: true,
      volume: 0.5,
    });
    setActiveHowl(howl);
    howl.play()
  };

  const stopRadio = () => {
    activeHowl.unload()
  };

  const toggleRadio = (stationName: string) => {
    if (activePlayer === stationName) {
      stopRadio();
      reset();

    } else {
      if (activePlayer) {
        stopRadio()
        reset();
      }
      setActivePlayer(stationName);
      initRadio(stationName);
    }
  };

  return {
    toggleRadio,
  };
}

export default useRadioToggle;

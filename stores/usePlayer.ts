import { create } from "zustand";
// @ts-ignore
import { Howl } from "howler";

interface activePlayer {
  stationName: string | undefined;
  type: "radio" | "mixtape" | "episode" | undefined;
  info?: object;
}


interface PlayerStore {
  playlist: string[];
  activePlayer: activePlayer;
  activeHowl?: Howl;
  setActivePlayer: (player: activePlayer) => void;
  setPlaylist: (ids: string[]) => void;
  setActiveHowl: (howl: Howl) => void;
  reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  playlist: [],
  activePlayer: { stationName: undefined, type: undefined, info: undefined },
  activeHowl: undefined,
  setActivePlayer: (player) =>
    set({
      activePlayer: {
        stationName: player.stationName,
        type: player.type,
        info: player.info,
      },
    }),
  setPlaylist: (playlist) => set({ playlist }),
  setActiveHowl: (howl) => set({ activeHowl: howl }),
  reset: () =>
    set({
      playlist: [],
      activePlayer: { stationName: undefined, type: undefined, info: undefined },
      activeHowl: undefined,
    }),
}));

export default usePlayer;

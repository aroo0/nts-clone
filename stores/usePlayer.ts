import { create } from "zustand";
// @ts-ignore
import { Howl } from "howler";
import { activePlayerInfo } from "@/types/general";

interface activePlayer {
  stationName: string | undefined;
  type: "radio" | "mixtape" | "episode" | undefined;
  info?: activePlayerInfo;
  pause?: boolean;
  isLoadingAudio?: string;
}

interface PlayerStore {
  playlist: string[];
  activePlayer: activePlayer;
  activeHowl?: Howl;
  setActivePlayer: (player: activePlayer) => void;
  setPlaylist: (ids: string[]) => void;
  setActiveHowl: (howl: Howl) => void;
  setPause: (pause: boolean) => void;
  setIsLoadingAudio: (isLoading: string) => void;
  reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  playlist: [],
  activePlayer: {
    stationName: undefined,
    type: undefined,
    info: undefined,
    pause: false,
    isLoadingAudio: 'unloaded',
  },
  activeHowl: undefined,
  setActivePlayer: (player) =>
    set({
      activePlayer: {
        stationName: player.stationName,
        type: player.type,
        info: player.info,
        pause: false,
        isLoadingAudio: 'unloaded',
      },
    }),
  setIsLoadingAudio: (isLoading) =>
    set((state) => ({
      activePlayer: {
        ...state.activePlayer,
        isLoadingAudio: isLoading,
      },
    })),

  setPause: (pause) =>
    set((state) => ({
      activePlayer: {
        ...state.activePlayer,
        pause: pause,
      },
    })),
  setPlaylist: (playlist) => set({ playlist }),
  setActiveHowl: (howl) => set({ activeHowl: howl }),
  reset: () =>
    set({
      playlist: [],
      activePlayer: {
        stationName: undefined,
        type: undefined,
        info: undefined,
        pause: false,
        isLoadingAudio: 'unloaded',
      },
      activeHowl: undefined,
    }),
}));

export default usePlayer;

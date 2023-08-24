import { create } from "zustand";
// @ts-ignore
import { Howl } from "howler";


interface PlayerStore {
  playlist: string[];
  activePlayer?: string | undefined;
  activeHowl?: Howl | undefined
  setActivePlayer: (id: string) => void;
  setPlaylist: (ids: string[]) => void;
  setActiveHowl: (howl: Howl) => void
  reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  playlist: [],
  activePlayer: undefined,
  activeHowl: undefined,
  setActivePlayer: (player: string) => set({ activePlayer: player }),
  setPlaylist: (playlist: string[]) => set({ playlist }),
  setActiveHowl: (howl: Howl) => set({ activeHowl: howl }),
  reset: () => set({ playlist: [], activePlayer: undefined, activeHowl: undefined }),
}));

export default usePlayer;

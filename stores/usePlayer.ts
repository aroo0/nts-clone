import { create } from "zustand";

interface PlayerStore {
  playlist: string[];
  activePlayer?: string | undefined;
  setActivePlayer: (id: string) => void;
  setPlaylist: (ids: string[]) => void;
  reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  playlist: [],
  activePlayer: undefined,
  setActivePlayer: (player: string) => set({ activePlayer: player }),
  setPlaylist: (playlist: string[]) => set({ playlist }),
  reset: () => set({ playlist: [], activePlayer: undefined }),
}));

export default usePlayer;

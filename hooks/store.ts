import { create } from "zustand";

type PositionType = {
  x: number | null;
  y: number | null;
};

interface GameState {
  modalIntro: boolean;
  position: PositionType;
  progress: string;
  changeModalIntro: () => void;
}

const useGameState = create<GameState>()((set) => ({
  modalIntro: false,
  position: {
    x: null,
    y: null,
  },
  progress: "",
  changeModalIntro: () => set(() => ({ modalIntro: true })),
}));

export default useGameState;

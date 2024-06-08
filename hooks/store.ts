import { create } from "zustand";

type PositionType = {
  x: number | null;
  y: number | null;
};

interface GameState {
  modalHeadphone: boolean;
  isIntroEnded: boolean;
  isIntroLoaded: boolean;
  isLogin: boolean;
  position: PositionType;
  progress: string;
  changeModalHeadphone: () => void;
  changeIsIntroLoaded: () => void;
  changeIsIntroEnded: () => void;
  changeIsLogin: () => void;
}

const useGameState = create<GameState>((set) => ({
  modalHeadphone: false,
  isIntroEnded: false,
  isIntroLoaded: false,
  isLogin: false,
  position: {
    x: null,
    y: null,
  },
  progress: "",
  changeModalHeadphone: () => set({ modalHeadphone: true }),
  changeIsIntroLoaded: () => set({ isIntroLoaded: true }),
  changeIsIntroEnded: () => set({ isIntroEnded: true }),
  changeIsLogin: () => set({ isLogin: true }),
}));

export default useGameState;

import { create } from "zustand";

type PositionType = {
  x: number | null;
  y: number | null;
};

interface GameState {
  modalHeadphone: boolean;
  isPlay: boolean;
  isIntroEnded: boolean;
  isIntroLoaded: boolean;
  position: PositionType;
  progress: string;
  changeModalHeadphone: () => void;
  changeIsPlayState: () => void;
  changeIsIntroLoaded: () => void;
  changeIsIntroEnded: () => void;
}

const useGameState = create<GameState>((set) => ({
  modalHeadphone: false,
  isPlay: false,
  isIntroEnded: false,
  isIntroLoaded: false,
  position: {
    x: null,
    y: null,
  },
  progress: "",
  changeModalHeadphone: () => set({ modalHeadphone: true }),
  changeIsPlayState: () => set({ isPlay: true }),
  changeIsIntroLoaded: () => set({ isIntroLoaded: true }),
  changeIsIntroEnded: () => set({ isIntroEnded: true }),
}));

export default useGameState;

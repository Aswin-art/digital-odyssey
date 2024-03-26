import { create } from "zustand";

type PositionType = {
  x: number | null;
  y: number | null;
};

interface GameState {
  modalHeadphone: boolean;
  isPlay: boolean;
  isIntroEnded: boolean;
  position: PositionType;
  progress: string;
  changeModalHeadphone: () => void;
  changeIsPlayState: () => void;
}

const useGameState = create<GameState>()((set) => ({
  modalHeadphone: false,
  isPlay: false,
  isIntroEnded: false,
  position: {
    x: null,
    y: null,
  },
  progress: "",
  changeModalHeadphone: () => set(() => ({ modalHeadphone: true })),
  changeIsPlayState: () => set(() => ({ isPlay: true })),
}));

export default useGameState;

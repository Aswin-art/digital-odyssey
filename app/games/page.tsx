"use client";
import React from "react";
import Modal from "@/components/Modal";
import useGameState from "@/hooks/store";
import VideoIntro from "@/components/VideoIntro";

const page = () => {
  const gameState = useGameState((state) => state);
  return (
    <>
      {gameState.isIntroEnded ? (
        // <Modal
        //   title="Coming Soon"
        //   desc="Game masih dalam tahap pengembangan"
        //   btnText="kembali"
        //   onClickFunc={() => console.log("oke")}
        // />
        <iframe
          title="game-canvas"
          src="https://digital-odyssey-game.vercel.app/"
          className="w-screen h-screen"
        ></iframe>
      ) : (
        <VideoIntro />
      )}
      <div className="block lg:hidden">
        <Modal
          title="Resolusi Tidak Sesuai"
          desc="Buka dan mainkan di resolusi minimal 1024px"
          btnText="Mengerti!"
          onClickFunc={() => null}
        />
      </div>
    </>
  );
};

export default page;

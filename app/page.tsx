"use client";
import ModalIntro from "@/components/ModalIntro";
import MusicBackground from "@/components/MusicBackground";
import useGameState from "@/hooks/store";
import localFont from "next/font/local";
import AnimatedCursor from "react-animated-cursor";
import { Howl } from "howler";

const myFont = localFont({
  src: "./dragon-hunter.otf",
  display: "swap",
});

export default function Home() {
  const gameState = useGameState((state) => state.modalIntro);
  const handleHover = () => {
    const buttonPlayElement = document.getElementById("buttonPlay");
    if (buttonPlayElement) {
      buttonPlayElement.style.filter = "brightness(0.8)";
    }
  };

  const handleHoverExit = () => {
    const buttonPlayElement = document.getElementById("buttonPlay");
    if (buttonPlayElement) {
      buttonPlayElement.style.filter = "brightness(1)";
    }
  };

  const handleButtonClick = () => {
    const newSound = new Howl({
      src: ["/musics/click_button.wav"],
      autoplay: true,
    });
    newSound.play();
  };
  return (
    <>
      {!gameState ? (
        <ModalIntro />
      ) : (
        <>
          <main
            className="flex flex-col items-center min-h-screen justify-end gap-5 p-24"
            style={{
              backgroundImage: `url('/images/bg-hero.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h1 className={`text-4xl text-white font-bold ${myFont.className}`}>
              digital odyssey
            </h1>
            <h1 className="text-6xl text-white font-bold">
              The Canonical Chronicles
            </h1>
            <h1
              className={`text-2xl text-black font-bold px-14 py-3 ${myFont.className}`}
              id="buttonPlay"
              style={{
                backgroundImage: `url('/images/btn-background.webp')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transition: "filter 0.3s",
              }}
              onMouseEnter={handleHover}
              onMouseLeave={handleHoverExit}
              onClick={handleButtonClick}
            >
              play games
            </h1>
          </main>
          <MusicBackground />
          <AnimatedCursor
            innerSize={10}
            outerSize={45}
            innerScale={1}
            outerScale={2}
            outerAlpha={0}
            innerStyle={{
              backgroundColor: "white",
            }}
            outerStyle={{
              border: "3px solid white",
            }}
          />
        </>
      )}
    </>
  );
}

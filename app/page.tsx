"use client";
import Modal from "@/components/Modal";
import MusicBackground from "@/components/MusicBackground";
import useGameState from "@/hooks/store";
import localFont from "next/font/local";
import AnimatedCursor from "react-animated-cursor";
import { Howl } from "howler";
import Navbar from "@/components/Navbar";
import VideoIntro from "@/components/VideoIntro";

const myFont = localFont({
  src: "./dragon-hunter.otf",
  display: "swap",
});

export default function Home() {
  const gameState = useGameState((state) => state);
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
    gameState.changeIsPlayState();
  };

  const updateModalIntroState = useGameState(
    (state) => state.changeModalHeadphone
  );

  return (
    <>
      <div className="hidden lg:block">
        {!gameState.modalHeadphone ? (
          <Modal
            title="Tips Sebelum Bermain"
            desc="Gunakan headphone untuk kenyamanan bermain"
            btnText="Mengerti!"
            onClickFunc={updateModalIntroState}
          />
        ) : (
          <>
            {!gameState.isPlay ? (
              <>
                {/* <Navbar /> */}
                <main
                  className="flex flex-col items-center min-h-screen justify-end gap-5 p-24"
                  style={{
                    backgroundImage: `url('/images/bg-hero.png')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <h1
                    className={`text-4xl lg:none text-white font-bold ${myFont.className}`}
                  >
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
              </>
            ) : (
              <>
                {gameState.isIntroEnded ? (
                  <Modal
                    title="Coming Soon"
                    desc="Game masih dalam tahap pengembangan"
                    btnText="kembali"
                    onClickFunc={() => console.log("oke")}
                  />
                ) : (
                  <VideoIntro />
                )}
              </>
            )}

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
      </div>
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
}

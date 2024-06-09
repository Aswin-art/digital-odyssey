"use client";
import useGameState from "@/hooks/store";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { motion } from "framer-motion";
import { SpinningCircles } from "react-loading-icons";

const VideoIntro = () => {
  const gameState = useGameState((state) => state);

  useEffect(() => {
    const video = document.querySelector("video");

    const handleLoadedData = () => {
      gameState.changeIsIntroLoaded();
    };

    const handleVideoEnded = () => {
      gameState.changeIsIntroEnded();
    };

    if (video) {
      video.addEventListener("loadeddata", handleLoadedData);
      video.addEventListener("ended", handleVideoEnded);

      return () => {
        video.removeEventListener("loadeddata", handleLoadedData);
        video.removeEventListener("ended", handleVideoEnded);
      };
    }
  }, [gameState]);

  return (
    <>
      <video
        autoPlay
        playsInline
        className="w-full max-h-screen object-cover absolute z-0"
        src={"/videos/intro.mov"}
      >
        Maaf, browser Anda tidak mendukung video HTML5 dengan format yang
        diberikan.
      </video>

      {!gameState.isIntroLoaded && (
        <main className="flex flex-col items-center min-h-screen justify-center gap-5 p-24 bg-black">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-black border-slate-700">
              <CardHeader>
                <CardTitle className="text-center text-white">
                  Loading Video
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white text-center">
                <SpinningCircles className="mx-auto" />
              </CardContent>
            </Card>
          </motion.div>
        </main>
      )}
    </>
  );
};

export default VideoIntro;

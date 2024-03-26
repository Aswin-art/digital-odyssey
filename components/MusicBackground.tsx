import React from "react";
import { useHowl, Play } from "rehowl";

const MusicBackground = () => {
  const { howl } = useHowl({
    src: ["/musics/landing-music-background.wav"],
    preload: true,
  });
  return <Play howl={howl} loop={true} />;
};

export default MusicBackground;

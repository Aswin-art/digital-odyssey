import React from "react";

const VideoIntro = () => {
  return (
    <video autoPlay playsInline className="w-full max-h-screen object-cover">
      <source src={"/videos/intro.mov"} type="video/mp4" />
      Maaf, browser Anda tidak mendukung video HTML5 dengan format yang
      diberikan.
    </video>
  );
};

export default VideoIntro;

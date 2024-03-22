import React, { Component } from "react";
import ReactHowler from "react-howler";

class MusicBackground extends Component {
  render() {
    return (
      <ReactHowler
        src="/musics/music-background.wav"
        playing={true}
        loop={true}
        html5={true}
        preload={true}
      />
    );
  }
}

export default MusicBackground;

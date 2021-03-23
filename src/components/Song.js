import React from "react";

function Song({ currentSong }) {
  return (
    <div className="song">
      <img src={currentSong.cover} alt="" />
      <h1>{currentSong.name}</h1>
      <h2>{currentSong.author}</h2>
    </div>
  );
}

export default Song;

import React from "react";
import LibraryItem from "./LibraryItem";
function Library({
  songs,
  songInfo,
  setSongInfo,
  currentSong,
  setCurrentSong,
  setSongs,
  audioRef,
  isPlaying,
  setIsPlaying,
  LibraryActive,
}) {
  return (
    <div className={`library ${!LibraryActive ? "LibraryActive" : ""}`}>
      <h1>Library</h1>
      {songs.map((song) => {
        return (
          <LibraryItem
            song={song}
            songInfo={songInfo}
            setSongInfo={setSongInfo}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            songs={songs}
            setSongs={setSongs}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        );
      })}
    </div>
  );
}

export default Library;

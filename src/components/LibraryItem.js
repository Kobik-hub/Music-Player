import React from "react";

function LibraryItem({
  song,
  songs,
  songInfo,
  setSongInfo,
  currentSong,
  setCurrentSong,
  setSongs,
  audioRef,
  isPlaying,
  setIsPlaying,
}) {
  //Functions
  const libraryPlay = async () => {
    let newSongs = songs.map((song) => {
      return { ...song, active: false };
    });
    let songIndex = songs.indexOf(song);
    newSongs[songIndex] = { ...song, active: true };
    setSongs(newSongs);
    await setCurrentSong(song);
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  return (
    <div
      onClick={libraryPlay}
      className={`library-item ${song.active ? "active" : ""}`}
    >
      <img src={song.cover} alt="" />
      <div>
        <h3>{song.name}</h3>
        <h5>{song.author}</h5>
      </div>
    </div>
  );
}

export default LibraryItem;

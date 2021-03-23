import React, { useState, useRef } from "react";
import chillHop from "./data";
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
import Nav from "./components/Nav";
function App() {
  //Ref
  const audioRef = useRef(null);

  //States
  const [songs, setSongs] = useState(chillHop());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [LibraryActive, setLibraryActive] = useState(false);
  //Functions

  const timeUpdateHandler = (e) => {
    let currentTime = e.target.currentTime;
    let duration = e.target.duration;
    setSongInfo({
      currentTime: currentTime,
      duration: duration,
    });
  };

  const autoNextSong = async () => {
    let newSongs = songs.map((song) => {
      return { ...song, active: false };
    });
    let songIndex = songs.findIndex((song) => song.id === currentSong.id);

    if (songIndex >= songs.length - 1) {
      songIndex = 0;
    } else {
      songIndex = songIndex + 1;
    }
    console.log(songIndex);

    newSongs[songIndex] = { ...newSongs[songIndex], active: true };
    setSongs(newSongs);
    await setCurrentSong(songs[songIndex]);

    if (isPlaying) {
      await audioRef.current.play();
    }
  };

  return (
    <div className="App">
      <Library
        LibraryActive={LibraryActive}
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
      <Nav LibraryActive={LibraryActive} setLibraryActive={setLibraryActive} />
      <Song currentSong={currentSong} />
      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        songs={songs}
        setSongs={setSongs}
        audioRef={audioRef}
      />
      <audio
        src={currentSong.audio}
        onTimeUpdate={timeUpdateHandler}
        onEnded={autoNextSong}
        ref={audioRef}
      ></audio>
    </div>
  );
}

export default App;

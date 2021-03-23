import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function Player({
  songs,
  setSongs,
  songInfo,
  setCurrentSong,
  currentSong,
  audioRef,
  isPlaying,
  setIsPlaying,
  setSongInfo,
}) {
  //Functions
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const playControlHandler = () => {
    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const skipForwardlHandler = async () => {
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

  const skipBackHandler = async () => {
    let newSongs = songs.map((song) => {
      return { ...song, active: false };
    });
    let songIndex = songs.findIndex((song) => song.id === currentSong.id);

    if (songIndex === 0) {
      songIndex = songs.length - 1;
    } else {
      songIndex = songIndex - 1;
    }
    newSongs[songIndex] = { ...newSongs[songIndex], active: true };
    setSongs(newSongs);
    await setCurrentSong(songs[songIndex]);
    if (isPlaying) {
      await audioRef.current.play();
    }
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime || 0)}</p>
        <input
          min={0}
          max={songInfo.duration}
          value={songInfo.currentTime}
          onChange={dragHandler}
          type="range"
          name=""
          id=""
        />
        <p>{getTime(songInfo.duration)}</p>
      </div>

      <div className="play-control">
        <FontAwesomeIcon
          onClick={skipBackHandler}
          size="lg"
          icon={faChevronLeft}
        />
        <FontAwesomeIcon
          onClick={playControlHandler}
          size="lg"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={skipForwardlHandler}
          size="lg"
          icon={faChevronRight}
        />
      </div>
    </div>
  );
}

export default Player;

import React, { useState, useEffect, useRef } from "react";
import {
  PlayArrow,
  Pause,
  SkipNext,
  SkipPrevious,
  VolumeOff,
  VolumeUp,
  ThumbUpAltOutlined,
  MoreVert,
} from "@mui/icons-material";
import "../styles/musicPlayer.css";
import SimpleSnackbar2 from "./utils/SimpleSnackbar2";

function MusicPlayer(props) {
  const audioElem = useRef();

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  useEffect(() => {
    setCurrentSongIndex(props.newIndex);
  }, [props.newIndex]);
  const [playlist, setPlaylist] = useState(props.songArr);
  useEffect(() => {
    setPlaylist(props.songArr);
  }, [props.songArr]);

  const pauseSong = () => {
    props.setIsSongPlaying(false);
  };
  const playSong = () => {
    props.setIsSongPlaying(true);
  };

  const nextSong = () => {
    // Check if there are more songs in the playlist
    if (currentSongIndex < playlist.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
      props.setNewIndex(props.newIndex + 1);
    }
  };

  const prevSong = () => {
    // Check if there are previous songs in the playlist
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
      props.setNewIndex(props.newIndex - 1);
    }
  };

  // Add a new state to track whether the current song has ended
  const [songEnded, setSongEnded] = useState(false);

  useEffect(() => {
    const handleSongEnd = () => {
      if (currentSongIndex < playlist.length - 1) {
        setSongEnded(false);
        setCurrentSongIndex(currentSongIndex + 1);
        props.setNewIndex(props.newIndex + 1);
      }
      setSongEnded(true);
    };

    audioElem.current.addEventListener("ended", handleSongEnd);

    return () => {
      audioElem.current.removeEventListener("ended", handleSongEnd);
      setSongEnded(false);
    };
  }, [currentSongIndex, playlist, props]);

  useEffect(() => {
    // Load the current song when the currentSongIndex changes
    console.log("currentSongIndex", currentSongIndex);
    console.log("playlist", playlist);
    // setTimeout(() => {
    audioElem.current.src = playlist[currentSongIndex].audio_url;
    // }, 2000);
  }, [currentSongIndex, playlist]);
  // useEffect(() => {
  //   const audio = audioElem.current;

  //   // Check if the audio element is currently loading a source
  //   if (audio.readyState > 0) {
  //     // If it's not loading, you can safely call play()
  //     audio.play().catch((error) => {
  //       // Handle any play() errors, if necessary
  //       console.error("Error while playing audio:", error);
  //     });
  //   } else {
  //     // If it's still loading, add an event listener to play when it's ready
  //     audio.oncanplaythrough = () => {
  //       audio.play().catch((error) => {
  //         // Handle any play() errors, if necessary
  //         console.error("Error while playing audio:", error);
  //       });
  //       // Remove the event listener to prevent multiple play attempts
  //       audio.oncanplaythrough = null;
  //     };
  //   }

  //   // Load the new source
  //   audio.src = playlist[currentSongIndex].audio_url;
  // }, [currentSongIndex, playlist]);

  useEffect(() => {
    if (props.isSongPlaying) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
    }
  }, [props.isSongPlaying, playlist, currentSongIndex]);

  //for progress bar

  const [progress, setProgress] = useState("");
  const onplaying = () => {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;
    setProgress((ct / duration) * 100);
  };

  //for volume
  const [volume, setVolume] = useState(40);

  useEffect(() => {
    audioElem.current.volume = volume / 100; // Set volume as a value between 0 and 1
  }, [volume]);

  const toggleMute = () => {
    if (volume < 0.1) {
      setVolume(40);
    } else {
      setVolume(0);
    }
  };
  //for snackbar when a song is liked
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const openSnackbar = () => {
    setIsSnackbarOpen(true);
  };

  return (
    <>
      <div className="audio-controls">
        <div className="progressBar_container">
          <div
            className="progressBar"
            style={{ width: `${progress + "%"}`, transition: "linear" }}
          ></div>
        </div>
        <audio ref={audioElem} onTimeUpdate={onplaying} />
        <div className="playback-controls">
          <button
            onClick={prevSong}
            disabled={currentSongIndex === 0 ? true : false}
          >
            <SkipPrevious color={currentSongIndex === 0 ? "disabled" : ""} />
          </button>
          {props.isSongPlaying && !songEnded ? (
            <button onClick={pauseSong}>
              <Pause />
            </button>
          ) : (
            <button onClick={playSong}>
              <PlayArrow />
            </button>
          )}
          <button
            onClick={nextSong}
            disabled={currentSongIndex === playlist.length - 1 ? true : false}
          >
            <SkipNext
              color={currentSongIndex === playlist.length - 1 ? "disabled" : ""}
            />
          </button>
        </div>

        <div className="songContainer songContainerMobile">
          <div className="songImg">
            <img src={playlist[currentSongIndex].thumbnail} alt="thumbnail" />
          </div>
          <div className="songText songTextMobile">
            <h4 className="songTitle">{playlist[currentSongIndex].title}</h4>
            <ul className="songArtist">
              <li>{playlist[currentSongIndex].artist[0].name}</li>
            </ul>
          </div>
          <div className="likeSongDiv">
            <ThumbUpAltOutlined
              style={{ cursor: "pointer" }}
              onClick={() => {
                props.handleLikedSong(playlist[currentSongIndex]);
                openSnackbar();
              }}
            />
            {/* <MoreVert style={{ cursor: "pointer" }} /> */}
          </div>
        </div>

        {/*  */}

        <div className="volume-controls">
          <div className="volume-slider">
            {/* Implement a volume slider here */}
            <input
              style={{ position: "absolute" }}
              type="range"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              min={0}
              max={100}
            />
          </div>

          {volume < 0.1 ? (
            <VolumeOff onClick={toggleMute} />
          ) : (
            <VolumeUp onClick={toggleMute} />
          )}
        </div>
      </div>
      <SimpleSnackbar2
        whenLiked={isSnackbarOpen}
        setIsSnackbarOpen={setIsSnackbarOpen}
        message={"Saved to your likes"}
      />
    </>
  );
}

export default MusicPlayer;

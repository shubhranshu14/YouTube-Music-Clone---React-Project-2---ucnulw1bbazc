import React, { useState, useEffect } from "react";
import Music_premium from "./Music_premium";
import Home from "./Home";
import Explore from "./Explore";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Library from "./Library";
import Likedsongs from "./Likedsongs";
import Album from "./Album";
import MusicPlayer from "./MusicPlayer";
import MoreAlbums from "./MoreAlbums";
import Page404 from "./utils/Page404";
import Music_premium_offers from "./Music_premium_offers";
import UpdatePass from "./Auth/UpdatePass";

function MainContainer() {
  //getting user details
  const [userProfile, setUserProfile] = useState(() => {
    const data = localStorage.getItem("userProfile");
    if (data) {
      return JSON.parse(data);
    }
    return null;
  });
  // useEffect(() => {
  //   console.log(userProfile);
  // }, []);

  //for playing song
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSongPlaying, setIsSongPlaying] = useState(false);
  // const [audioUrl, setAudioUrl] = useState("");
  const [newIndex, setNewIndex] = useState(null);
  const [songArr, setSongArr] = useState([]);
  const playSong = (songData, index) => {
    setIsPlaying(true);
    setIsSongPlaying(true);
    setNewIndex(index);
    setSongArr([songData]);
  };
  const playAlbumSong = (index) => {
    setNewIndex(index);
  };
  const getAlbumSong = (data) => {
    setSongArr(data);
    setNewIndex(0);
    setIsPlaying(true);
    setIsSongPlaying(true);
  };

  //when a song is liked we store that song data to local storage
  const [likedSongs, setLikedSongs] = useState(() => {
    const songStored = localStorage.getItem("arrLikedSong");
    if (songStored) return JSON.parse(songStored);
    else {
      return [];
    }
  });
  const handleLikedSong = (data) => {
    const isSongAlreadyLiked = likedSongs.some((song) => song._id === data._id);
    if (!isSongAlreadyLiked) {
      const updatedLikedSong = [...likedSongs, data];
      setLikedSongs(updatedLikedSong);
    }
  };
  useEffect(() => {
    localStorage.setItem("arrLikedSong", JSON.stringify(likedSongs));
  }, [likedSongs]);

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const currentPosition = window.scrollY;
    setScrollPosition(currentPosition);
  };

  // Attach the scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Remove the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Page404 />} />
          <Route
            path="/"
            element={
              <Home
                userProfile={userProfile}
                scrollPosition={scrollPosition}
                handleLikedSong={handleLikedSong}
                playSong={playSong}
                getAlbumSong={getAlbumSong}
                setIsPlaying={setIsPlaying}
                setIsSongPlaying={setIsSongPlaying}
              />
            }
          />
          <Route
            path="/explore"
            element={
              <Explore
                userProfile={userProfile}
                scrollPosition={scrollPosition}
                handleLikedSong={handleLikedSong}
                playSong={playSong}
                getAlbumSong={getAlbumSong}
                setIsPlaying={setIsPlaying}
                setIsSongPlaying={setIsSongPlaying}
              />
            }
          />
          <Route
            path="/library"
            element={
              <Library
                userProfile={userProfile}
                scrollPosition={scrollPosition}
                handleLikedSong={handleLikedSong}
                playSong={playSong}
                getAlbumSong={getAlbumSong}
                setIsPlaying={setIsPlaying}
                setIsSongPlaying={setIsSongPlaying}
              />
            }
          />
          <Route
            path="/music_premium"
            element={<Music_premium userProfile={userProfile} />}
          />
          <Route
            path="/music_premium/offers"
            element={<Music_premium_offers userProfile={userProfile} />}
          />
          <Route
            path="/likedSongs"
            element={
              <Likedsongs
                userProfile={userProfile}
                scrollPosition={scrollPosition}
                likedSongs={likedSongs}
                handleLikedSong={handleLikedSong}
                playSong={playSong}
              />
            }
          />
          <Route
            path="/album/:id"
            element={
              <Album
                userProfile={userProfile}
                scrollPosition={scrollPosition}
                handleLikedSong={handleLikedSong}
                playSong={playSong}
                playAlbumSong={playAlbumSong}
              />
            }
          />
          <Route
            path="/morealbums"
            element={
              <MoreAlbums
                userProfile={userProfile}
                scrollPosition={scrollPosition}
                handleLikedSong={handleLikedSong}
                playSong={playSong}
                getAlbumSong={getAlbumSong}
                setIsPlaying={setIsPlaying}
                setIsSongPlaying={setIsSongPlaying}
              />
            }
          />
          <Route
            path="/password-update"
            element={<UpdatePass userProfile={userProfile} />}
          />
        </Routes>
      </BrowserRouter>
      {isPlaying ? (
        <MusicPlayer
          songArr={songArr}
          newIndex={newIndex}
          setNewIndex={setNewIndex}
          isSongPlaying={isSongPlaying}
          setIsSongPlaying={setIsSongPlaying}
          handleLikedSong={handleLikedSong}
        />
      ) : null}
    </>
  );
}

export default MainContainer;

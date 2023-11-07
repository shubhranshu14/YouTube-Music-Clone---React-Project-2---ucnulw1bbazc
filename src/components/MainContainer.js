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
import SimpleSnackbar from "./utils/SimpleSnackbar";

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

  //for snackbar when a song is liked
  const [msgSnack, setMsgSnack] = useState("Saved to your likes");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  // const openSnackbar = () => {
  //   setIsSnackbarOpen(true);
  // };
  //when a song is liked we store that song data to local storage
  const [likedSongs, setLikedSongs] = useState(() => {
    const songStored = localStorage.getItem("arrLikedSong");
    if (songStored) return JSON.parse(songStored);
    else {
      return [];
    }
  });
  const handleLikedSong = (data) => {
    setIsSnackbarOpen(true);
    const isSongAlreadyLiked = likedSongs.some((song) => song._id === data._id);
    if (!isSongAlreadyLiked) {
      const updatedLikedSong = [...likedSongs, data];
      setLikedSongs(updatedLikedSong);
      setMsgSnack("Saved to your likes");
    } else {
      setMsgSnack("Already saved to your likes");
    }
  };
  useEffect(() => {
    localStorage.setItem("arrLikedSong", JSON.stringify(likedSongs));
  }, [handleLikedSong]);

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

  //add album to library

  const [libraryArr, setLibraryArr] = useState(() => {
    const res = localStorage.getItem("libraryArr");
    if (res) {
      const albumAdded = JSON.parse(res);
      console.log("got from local", albumAdded);
      return albumAdded;
    }
    return [];
  });
  useEffect(() => {
    console.log(libraryArr);
  }, [libraryArr]);

  const handleAddtolib = (e, data) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSnackbarOpen(true);
    const isAlbumAdded = libraryArr.some((album) => album._id === data._id);
    if (isAlbumAdded) {
      setLibraryArr(libraryArr.filter((album) => album._id != data._id));
      setMsgSnack("Removed from library");
      return;
    }
    setMsgSnack("Saved to library");
    setLibraryArr((prev) => [...prev, data]);
  };

  useEffect(() => {
    localStorage.setItem("libraryArr", JSON.stringify(libraryArr));
  }, [libraryArr]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Page404 />} />
          <Route
            path="/"
            element={
              <>
                <Home
                  userProfile={userProfile}
                  scrollPosition={scrollPosition}
                  handleLikedSong={handleLikedSong}
                  playSong={playSong}
                  getAlbumSong={getAlbumSong}
                  setIsPlaying={setIsPlaying}
                  setIsSongPlaying={setIsSongPlaying}
                  libraryArr={libraryArr}
                  setLibraryArr={setLibraryArr}
                  handleAddtolib={handleAddtolib}
                />
                <SimpleSnackbar
                  whenLiked={isSnackbarOpen}
                  setIsSnackbarOpen={setIsSnackbarOpen}
                  message={msgSnack}
                />
              </>
            }
          />
          <Route
            path="/explore"
            element={
              <>
                <Explore
                  userProfile={userProfile}
                  scrollPosition={scrollPosition}
                  handleLikedSong={handleLikedSong}
                  playSong={playSong}
                  getAlbumSong={getAlbumSong}
                  setIsPlaying={setIsPlaying}
                  setIsSongPlaying={setIsSongPlaying}
                  libraryArr={libraryArr}
                  setLibraryArr={setLibraryArr}
                  handleAddtolib={handleAddtolib}
                />
                <SimpleSnackbar
                  whenLiked={isSnackbarOpen}
                  setIsSnackbarOpen={setIsSnackbarOpen}
                  message={msgSnack}
                />
              </>
            }
          />
          <Route
            path="/library"
            element={
              <>
                <Library
                  userProfile={userProfile}
                  scrollPosition={scrollPosition}
                  handleLikedSong={handleLikedSong}
                  playSong={playSong}
                  getAlbumSong={getAlbumSong}
                  setIsPlaying={setIsPlaying}
                  setIsSongPlaying={setIsSongPlaying}
                  libraryArr={libraryArr}
                  setLibraryArr={setLibraryArr}
                  handleAddtolib={handleAddtolib}
                />
                <SimpleSnackbar
                  whenLiked={isSnackbarOpen}
                  setIsSnackbarOpen={setIsSnackbarOpen}
                  message={msgSnack}
                />
              </>
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
              <>
                <Likedsongs
                  userProfile={userProfile}
                  scrollPosition={scrollPosition}
                  likedSongs={likedSongs}
                  setLikedSongs={setLikedSongs}
                  handleLikedSong={handleLikedSong}
                  playSong={playSong}
                />
                <SimpleSnackbar
                  whenLiked={isSnackbarOpen}
                  setIsSnackbarOpen={setIsSnackbarOpen}
                  message={msgSnack}
                />
              </>
            }
          />
          <Route
            path="/album/:id"
            element={
              <>
                <Album
                  userProfile={userProfile}
                  scrollPosition={scrollPosition}
                  handleLikedSong={handleLikedSong}
                  playSong={playSong}
                  playAlbumSong={playAlbumSong}
                  libraryArr={libraryArr}
                  setLibraryArr={setLibraryArr}
                  handleAddtolib={handleAddtolib}
                />
                <SimpleSnackbar
                  whenLiked={isSnackbarOpen}
                  setIsSnackbarOpen={setIsSnackbarOpen}
                  message={msgSnack}
                />
              </>
            }
          />
          <Route
            path="/morealbums"
            element={
              <>
                <MoreAlbums
                  userProfile={userProfile}
                  scrollPosition={scrollPosition}
                  handleLikedSong={handleLikedSong}
                  playSong={playSong}
                  getAlbumSong={getAlbumSong}
                  setIsPlaying={setIsPlaying}
                  setIsSongPlaying={setIsSongPlaying}
                  libraryArr={libraryArr}
                  setLibraryArr={setLibraryArr}
                  handleAddtolib={handleAddtolib}
                />
                <SimpleSnackbar
                  whenLiked={isSnackbarOpen}
                  setIsSnackbarOpen={setIsSnackbarOpen}
                  message={msgSnack}
                />
              </>
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

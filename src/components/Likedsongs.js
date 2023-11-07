import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import BackgroundImage from "./utils/BackgroundImage";
import "../styles/playlist.css";
import homeImg from "../img/library_background.jpg";
import likedThumbnail from "../img/likedThumbnail.png";
import {
  MoreVert,
  PlayArrow,
  ThumbUpAlt,
  ThumbDownAltOutlined,
} from "@mui/icons-material";
import SimpleSnackbar from "./utils/SimpleSnackbar";

function Likedsongs(props) {
  // const [dislikeSong, setDislikeSong] = useState(() => {
  //   const listofLikedSongs = localStorage.getItem("arrLikedSong");
  //   if (listofLikedSongs) {
  //     return JSON.parse(listofLikedSongs);
  //   }
  //   return null;
  // });
  const handleDislike = (data) => {
    const updatedLikedSong = /*dislikeSong*/ props.likedSongs.filter(
      (song) => song._id !== data._id
    );
    props.setLikedSongs(updatedLikedSong);
  };
  useEffect(() => {
    localStorage.setItem("arrLikedSong", JSON.stringify(props.likedSongs));
  }, [props.likedSongs]);
  //for snackbar when a song is liked
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const openSnackbar = () => {
    setIsSnackbarOpen(true);
  };

  return (
    <div className="playList">
      <BackgroundImage imgUrl={homeImg} />
      <Navbar
        scrollPosition={props.scrollPosition}
        userProfile={props.userProfile}
      />
      <div className="main_container">
        <SideBar scrollPosition={props.scrollPosition} />
        <div className="album_mainBody_container">
          <div className="playListContainer">
            <div className="playListThumbnail">
              <img src={likedThumbnail} alt="likedSongs" />
            </div>
            <div className="playListDiscription">
              <div className="playListName">
                <h1>Your likes</h1>
              </div>
              <div className="playListType">
                <h4>Auto playlist</h4>
                <h4>{props.likedSongs.length} Songs</h4>
              </div>
              <div className="playListMessage">
                <p>
                  Music that you like in any YouTube app will be shown here. You
                  can change this in Settings.
                </p>
              </div>
            </div>
          </div>
          <div className="playListSongs_container">
            {props.likedSongs.map((data, index) => (
              <div className="playListSongs_songContainer" key={index}>
                <div className="playListSongs_overlayForPlayingSongs">
                  <div className="songImgOverlay">
                    <PlayArrow
                      fontSize="large"
                      onClick={() => {
                        props.playSong(data, 0);
                      }}
                    />
                  </div>
                  <ThumbDownAltOutlined
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleDislike(data);
                      openSnackbar();
                    }}
                  />
                </div>
                <div className="playList_imgtitle">
                  <div className="songImg">
                    <img src={data.thumbnail} alt="thumbnail" />
                  </div>
                  <h4 className="songTitle">{data.title}</h4>
                </div>
                <div className="playList_songArtist">
                  <h4>{data.artist[0].name}</h4>
                </div>
                <div className="likeSongDiv">
                  <ThumbUpAlt />
                  {/* <MoreVert style={{ cursor: "pointer" }} /> */}
                </div>
              </div>
            ))}
          </div>
        </div>
        <SimpleSnackbar
          whenLiked={isSnackbarOpen}
          setIsSnackbarOpen={setIsSnackbarOpen}
          message={"Removed from your likes"}
        />
      </div>
    </div>
  );
}

export default Likedsongs;

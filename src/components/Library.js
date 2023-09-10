import React, { useState } from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import BackgroundImage from "./utils/BackgroundImage";
import "../styles/library.css";
import homeImg from "../img/library_background.jpg";
import likedThumbnail from "../img/likedThumbnail.png";
import { Link } from "react-router-dom";
import {
  ExpandCircleDownOutlined,
  MoreVert,
  PlayArrow,
  PushPin,
  ThumbUpAltOutlined,
} from "@mui/icons-material";

function Library(props) {
  return (
    <div className="library">
      <BackgroundImage imgUrl={homeImg} />
      <Navbar
        scrollPosition={props.scrollPosition}
        handleLikedSong={props.handleLikedSong}
        playSong={props.playSong}
        userProfile={props.userProfile}
      />
      <div className="main_container">
        <SideBar scrollPosition={props.scrollPosition} />
        <div className="playList_mainBody_container">
          <div className="albumContainer">
            <Link to="/likedSongs">
              <div className="albumImg">
                <div className="likedOverlay"></div>
                <img src={likedThumbnail} />
              </div>
            </Link>
            <div className="albumText">
              <h4 id="albumTitle">Your likes</h4>
              <div style={{ display: "flex", gap: "5px", marginTop: "4px" }}>
                <PushPin fontSize="small" style={{ color: "#afafaf" }} />
                <h4 style={{ color: "#afafaf" }}>Auto playlist</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Library;

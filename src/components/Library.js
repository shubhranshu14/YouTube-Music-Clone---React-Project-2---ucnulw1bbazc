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
  LibraryAddCheck,
  LibraryAddOutlined,
  MoreVert,
  PlayArrow,
  PushPin,
  ThumbUpAltOutlined,
} from "@mui/icons-material";

function Library(props) {
  //for selecting songs from album
  const handleAlbumClick = (album) => {
    props.getAlbumSong(album.songs); // puts all the songs of album in songArr.
  };

  //for moreVert

  const [isMoreVisible, setIsMoreVisible] = useState(false);
  const [isAlbumpresent, setIsAlbumpresent] = useState(false);
  const [intIndex, setIntIndex] = useState();
  const handleMoreVert = (event, ind, data) => {
    event.preventDefault();
    event.stopPropagation();
    setIntIndex(ind);
    setIsMoreVisible(!isMoreVisible);
    const isAlbumAdded = props.libraryArr.some(
      (album) => album._id === data._id
    );
    if (isAlbumAdded) {
      setIsAlbumpresent(true);
      return;
    }
    setIsAlbumpresent(false);
  };
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
          {props.libraryArr.map((data, index) => (
            <div className="albumContainer" key={index}>
              <Link
                to={`/album/${data._id}`}
                onClick={() => handleAlbumClick(data, index)}
              >
                <div className="albumImg">
                  <div className="likedOverlay">
                    <div
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "50%",
                        backgroundColor: "#2424243a",
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: "99",
                      }}
                      onClick={(e) => handleMoreVert(e, index, data)}
                    >
                      <MoreVert />
                    </div>
                    <div
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "50%",
                        backgroundColor: "#242424aa",
                        position: "absolute",
                        bottom: "20px",
                        right: "20px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <PlayArrow />
                    </div>
                  </div>
                  <img src={data.image} />
                  {isMoreVisible && index === intIndex ? (
                    <div
                      className="addtolib"
                      style={{ left: index === 0 ? "140px" : "-50px" }}
                      onClick={(e) => {
                        props.handleAddtolib(e, data);
                        setIsMoreVisible(false);
                      }}
                    >
                      {!isAlbumpresent ? (
                        <>
                          <LibraryAddOutlined />
                          <h4>Save album to library</h4>
                        </>
                      ) : (
                        <>
                          <LibraryAddCheck />
                          <h4>Remove album from library</h4>
                        </>
                      )}
                    </div>
                  ) : null}
                </div>
              </Link>
              <div className="albumText">
                <h4 id="albumTitle">{data.title}</h4>
                {/* <ul id="albumArtist">
                        <li>{data.artists[0]}</li>
                      </ul> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Library;

import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import BackgroundImage from "./utils/BackgroundImage";
import "../styles/playlist.css";
import homeImg from "../img/library_background.jpg";
import { MoreVert, PlayArrow, ThumbUpAltOutlined } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import SimpleSnackbar from "./utils/SimpleSnackbar";

function Album(props) {
  const [albumData, setAlbumData] = useState([]);
  const [albumSongs, setAlbumSongs] = useState([]);
  const [albumArtist, setAlbumArtist] = useState([]);
  const { id } = useParams();
  const getAlbumData = async () => {
    try {
      const res = await fetch(
        `https://academics.newtonschool.co/api/v1/music/album/${id}`,
        {
          headers: {
            projectId: "ucnulw1bbazc",
          },
        }
      );
      const responseOfAlbum = await res.json();
      const responseData = responseOfAlbum.data;
      setAlbumData(responseData);
      setAlbumSongs(responseData.songs);
      setAlbumArtist(responseData.artists);
    } catch {}
  };
  useEffect(() => {
    getAlbumData();
  }, []);

  // //for snackbar when a song is liked
  // const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  // const openSnackbar = () => {
  //   setIsSnackbarOpen(true);
  // };
  return (
    <div className="playList">
      <BackgroundImage imgUrl={homeImg} />
      <Navbar
        scrollPosition={props.scrollPosition}
        handleLikedSong={props.handleLikedSong}
        playSong={props.playSong}
        userProfile={props.userProfile}
      />
      <div className="main_container">
        <SideBar scrollPosition={props.scrollPosition} />
        <div className="album_mainBody_container">
          <div className="playListContainer">
            <div className="playListThumbnail">
              <img src={albumData.image} alt="likedSongs" />
            </div>
            <div className="playListDiscription">
              <div className="playListName">
                <h1>{albumData.title}</h1>
              </div>
              <div className="playListType">
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {albumArtist.map((name, index) => (
                    <h4 style={{ whiteSpace: "nowrap" }} key={index}>
                      🎤 {name.name}
                    </h4>
                  ))}
                </div>
                <h4>
                  {albumSongs.length} {albumSongs.length > 1 ? "songs" : "song"}
                </h4>
              </div>
              <div className="playListMessage">
                <p>{albumData.description}</p>
              </div>
            </div>
          </div>
          <div className="playListSongs_container">
            {albumSongs.map((song, index) => (
              <div className="playListSongs_songContainer" key={index}>
                <div className="playListSongs_overlayForPlayingSongs">
                  <div className="songImgOverlay">
                    <PlayArrow
                      fontSize="large"
                      onClick={() => props.playAlbumSong(index)}
                    />
                  </div>
                </div>
                <div className="playList_imgtitle">
                  <div
                    className="songImg"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h4 style={{ color: "#fff" }}>{index + 1}</h4>
                  </div>
                  <h4 className="songTitle">{song.title}</h4>
                </div>
                {/* <div className="playList_songArtist">
                  <h4>{albumData.artists[0].name}</h4>
                </div> */}
                <div className="likeSongDiv">
                  <ThumbUpAltOutlined
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      props.handleLikedSong(song);
                    }}
                  />
                  {/* <MoreVert style={{ cursor: "pointer" }} /> */}
                </div>
              </div>
            ))}
          </div>
          {/* <SimpleSnackbar
            whenLiked={isSnackbarOpen}
            setIsSnackbarOpen={setIsSnackbarOpen}
            message={"Saved to your likes"}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Album;

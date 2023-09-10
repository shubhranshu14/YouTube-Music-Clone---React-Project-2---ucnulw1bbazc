import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import BackgroundImage from "./utils/BackgroundImage";
import "../styles/home.css";
import { Avatar } from "@mui/material";
import homeImg from "../img/home_background.jpg";
import romanticImg from "../img/romanticImg.avif";
import happyImg from "../img/happyImg.avif";
import sadImg from "../img/sadImg.avif";
import excitedImg from "../img/excitedImg.avif";
import {
  ExpandCircleDownOutlined,
  MoreVert,
  NavigateBefore,
  NavigateNext,
  PlayArrow,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import SimpleSnackbar from "./utils/SimpleSnackbar";

function Home(props) {
  const [musicData, setMusicData] = useState([]);
  const [albumData, setAlbumData] = useState([]);
  const [albumData2, setAlbumData2] = useState([]);
  const getMusicData = async (moodType) => {
    try {
      //form 24Songs
      const res4song = await fetch(
        `https://academics.newtonschool.co/api/v1/music/song?page=25&limit=24&filter={"mood":"${moodType}"}`,
        {
          headers: {
            projectId: "ucnulw1bbazc",
          },
        }
      );
      const response4song = await res4song.json();
      const musicData = response4song.data;
      setMusicData(musicData);
      console.log(musicData);
      //for album1
      const res4album = await fetch(
        `https://academics.newtonschool.co/api/v1/music/album?page=3&limit=6`,
        {
          headers: {
            projectId: "ucnulw1bbazc",
          },
        }
      );
      const response4album = await res4album.json();
      const albumData = response4album.data;
      console.log(albumData);
      setAlbumData(albumData);
      //for album2
      const res4album2 = await fetch(
        "https://academics.newtonschool.co/api/v1/music/album?page=12&limit=6 ",
        {
          headers: {
            projectId: "ucnulw1bbazc",
          },
        }
      );
      const response4album2 = await res4album2.json();
      const albumData2 = response4album2.data;
      setAlbumData2(albumData2);

      // const res4album3 = await fetch(
      //   "https://academics.newtonschool.co/api/v1/music/song/64cf916047ae38c3e33a2ac7",
      //   {
      //     headers: {
      //       projectId: "ucnulw1bbazc",
      //     },
      //   }
      // );
      // const response4album3 = await res4album3.json();
      // const albumData3 = response4album3.data;
      // console.log(albumData3);
    } catch (err) {
      console.error("error featching music data", err);
    }
  };
  useEffect(() => {
    getMusicData("excited");
  }, []);

  //for filtering songs acc. to mood
  const [imgLink, setImgLink] = useState(`${homeImg}`);
  const [activeBtn, setActiveBtn] = useState(null);

  const getImgForMood = (moodType) => {
    if (moodType === "romantic") {
      return romanticImg;
    } else if (moodType === "happy") {
      return happyImg;
    } else if (moodType === "excited") {
      return excitedImg;
    } else if (moodType === "sad") {
      return sadImg;
    }
  };
  const moodFilterBtn = (moodType) => {
    setImgLink(getImgForMood(moodType));
    getMusicData(moodType);
    setActiveBtn(moodType);
  };

  //for x-axis scroll of innerMusicList
  const [positionOfDiv, setPositionOfDiv] = useState(0);
  const nextScroll = () => {
    setPositionOfDiv(positionOfDiv + 409);
  };
  const prevScroll = () => {
    setPositionOfDiv(positionOfDiv - 409);
  };
  //for snackbar when a song is liked
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const openSnackbar = () => {
    setIsSnackbarOpen(true);
  };

  //for selecting songs from album
  const handleAlbumClick = (album) => {
    props.getAlbumSong(album.songs); // puts all the songs of album in songArr.
  };

  return (
    <div className="home">
      <BackgroundImage imgUrl={imgLink} />
      <Navbar
        scrollPosition={props.scrollPosition}
        handleLikedSong={props.handleLikedSong}
        playSong={props.playSong}
        userProfile={props.userProfile}
      />
      <div className="main_container">
        <SideBar scrollPosition={props.scrollPosition} />
        <div className="mainBody_container">
          <div className="moodsBtn_container">
            <button
              id="forRomantic"
              className={activeBtn === "romantic" ? "active2" : ""}
              onClick={() => moodFilterBtn("romantic")}
            >
              Romantic
            </button>
            <button
              id="forHappy"
              className={activeBtn === "happy" ? "active2" : ""}
              onClick={() => moodFilterBtn("happy")}
            >
              Happy
            </button>
            <button
              id="forExcited"
              className={activeBtn === "excited" ? "active2" : ""}
              onClick={() => moodFilterBtn("excited")}
            >
              Excited
            </button>
            <button
              id="forSad"
              className={activeBtn === "sad" ? "active2" : ""}
              onClick={() => moodFilterBtn("sad")}
            >
              Sad
            </button>
          </div>

          <div className="musicSelecter firstDiv">
            <div className="headerForMusicDiv">
              <div style={{ display: "flex", gap: "10px" }}>
                <Avatar
                  src="https://yt3.ggpht.com/yti/AOXPAcW6OAwBvclk8TAo4Cy7-92-3eDQYT6JvXCmfrG3HQ=s108-c-k-c0x00ffffff-no-rj"
                  className="homeAvatar"
                />
                <div className="musicLists_title">
                  <h3 id="userName">
                    {props.userProfile && props.userProfile.name}
                  </h3>
                  <h1>Quick picks</h1>
                </div>
              </div>
              <div className="prev_next_Btn">
                <button
                  onClick={prevScroll}
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid",
                    borderColor: positionOfDiv === 0 ? "#282828" : "#afafaf",
                    cursor: positionOfDiv === 0 ? "" : "pointer",
                  }}
                  disabled={positionOfDiv === 0}
                >
                  <NavigateBefore
                    style={{
                      color: positionOfDiv === 0 ? "#282828" : "#fff",
                    }}
                    className="prevList_Btn"
                  />
                </button>
                <button
                  onClick={nextScroll}
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid",
                    borderColor: positionOfDiv === 1227 ? "#282828" : "#afafaf",
                    cursor: positionOfDiv === 1227 ? "" : "pointer",
                  }}
                  disabled={positionOfDiv === 1227}
                >
                  <NavigateNext
                    style={{
                      color: positionOfDiv === 1227 ? "#282828" : "#fff",
                    }}
                    className="nextList_Btn"
                  />
                </button>
              </div>
            </div>
            <div className="musicLists">
              <div
                className="inner_MusicLists"
                style={{ transform: `translateX(-${positionOfDiv}px) ` }}
              >
                {musicData.map((data, index) => (
                  <div className="songContainer" key={index}>
                    <div className="overlayForPlayingSongs">
                      <div className="songImgOverlay">
                        <PlayArrow
                          fontSize="large"
                          onClick={() => {
                            props.playSong(data, 0);
                          }}
                        />
                      </div>
                      <div className="likeSongDiv">
                        <ThumbUpAltOutlined
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            props.handleLikedSong(data);
                            openSnackbar();
                          }}
                        />
                        {/* <MoreVert style={{ cursor: "pointer" }} /> */}
                      </div>
                    </div>
                    <div className="songImg">
                      <img src={data.thumbnail} alt="thumbnail" />
                    </div>
                    <div
                      className="songText"
                      onClick={() => {
                        props.playSong(data, 0);
                      }}
                    >
                      <h4 className="songTitle">{data.title}</h4>
                      <ul className="songArtist">
                        <li>{data.artist[0].name}</li>
                        {/* {data.artist.map((name, index) => (
                          <li key={index}>{name.name}</li>
                        ))} */}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="musicSelecter secondDiv">
            <div className="headerForMusicDiv">
              <div style={{ display: "flex", gap: "10px" }}>
                <div className="musicLists_title">
                  <h1>Recommended albums</h1>
                </div>
              </div>
            </div>
            <div className="albumLists">
              <div className="inner_AlbumLists">
                {albumData.map((data, index) => (
                  <div className="albumContainer" key={index}>
                    <Link
                      to={`/album/${data._id}`}
                      onClick={() => handleAlbumClick(data)}
                    >
                      <div className="albumImg">
                        <div className="likedOverlay"></div>
                        <img src={data.image} />
                      </div>
                    </Link>
                    <div className="albumText">
                      <h4 id="albumTitle">{data.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="musicSelecter thirdDiv">
            <div className="headerForMusicDiv">
              <div style={{ display: "flex", gap: "10px" }}>
                <div className="musicLists_title">
                  <h3>FRESH HITS, SERVED HOT!</h3>
                  <h1>Fresh Tunes</h1>
                </div>
              </div>
            </div>
            <div className="albumLists">
              <div className="inner_AlbumLists">
                {albumData2.map((data, index) => (
                  <div className="albumContainer" key={index}>
                    <Link
                      to={`/album/${data._id}`}
                      onClick={() => handleAlbumClick(data, index)}
                    >
                      <div className="albumImg">
                        <div className="likedOverlay"></div>
                        <img src={data.image} />
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
            <SimpleSnackbar
              whenLiked={isSnackbarOpen}
              setIsSnackbarOpen={setIsSnackbarOpen}
              message={"Saved to your likes"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

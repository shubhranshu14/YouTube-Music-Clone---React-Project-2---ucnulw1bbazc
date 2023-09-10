import React, { useState, useEffect, useReducer } from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import BackgroundImage from "./utils/BackgroundImage";
import "../styles/explore.css";
import homeImg from "../img/home_background.jpg";
import {
  ExpandCircleDownOutlined,
  MoreVert,
  NavigateBefore,
  NavigateNext,
  PlayArrow,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import SimpleSnackbar from "./utils/SimpleSnackbar";

function Explore(props) {
  const [musicData, setMusicData] = useState([]);
  console.log(musicData);
  const [albumData, setAlbumData] = useState([]);
  const [albumData2, setAlbumData2] = useState([]);
  const getMusicData = async () => {
    try {
      //for top 20songs of the week
      const res4Trendingsong = await fetch(
        "https://academics.newtonschool.co/api/v1/music/song?limit=24",
        {
          headers: {
            projectId: "ucnulw1bbazc",
          },
        }
      );
      const response4song = await res4Trendingsong.json();
      const musicData = response4song.data;
      setMusicData(musicData);

      //for album1
      const res4top50 = await fetch(
        'https://academics.newtonschool.co/api/v1/music/song?filter={"featured":"Top 50 of this month"}',
        {
          headers: {
            projectId: "ucnulw1bbazc",
          },
        }
      );
      const response4album = await res4top50.json();
      const albumData = response4album.data;
      console.log(albumData);
      setAlbumData(albumData);
      //for album2
      const res4album2 = await fetch(
        "https://academics.newtonschool.co/api/v1/music/album?page=38&limit=6 ",
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
    getMusicData();
  }, []);

  //for x-axis scroll of innerMusicList1
  const [positionOfDiv, setPositionOfDiv] = useState(0);
  const nextScroll = () => {
    setPositionOfDiv(positionOfDiv + 409);
  };
  const prevScroll = () => {
    setPositionOfDiv(positionOfDiv - 409);
  };
  //for x-axis scroll of innerMusicList2
  const [positionOfDiv2, setPositionOfDiv2] = useState(0);
  const nextScroll2 = () => {
    setPositionOfDiv2(positionOfDiv2 + 409);
  };
  const prevScroll2 = () => {
    setPositionOfDiv2(positionOfDiv2 - 409);
  };

  //for selecting songs from album
  const handleAlbumClick = (album) => {
    props.getAlbumSong(album.songs); // puts all the songs of album in songArr.
  };

  //for snackbar when a song is liked
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const openSnackbar = () => {
    setIsSnackbarOpen(true);
  };
  const navigate = useNavigate();
  const handleMoreBtn = () => {
    navigate("/morealbums");
  };
  return (
    <div className="explore">
      <BackgroundImage imgUrl={homeImg} />
      <Navbar
        scrollPosition={props.scrollPosition}
        handleLikedSong={props.handleLikedSong}
        playSong={props.playSong}
        userProfile={props.userProfile}
      />
      <div className="main_container">
        <SideBar scrollPosition={props.scrollPosition} />
        <div className="mainBody_container">
          {/* first div for new albums and singles */}
          <div className="musicSelecter thirdDiv">
            <div className="headerForMusicDiv">
              <div style={{ display: "flex", gap: "10px" }}>
                <div className="musicLists_title">
                  <h1>New albums and singles</h1>
                </div>
              </div>
              <div
                className="moreBtn"
                style={{
                  color: "#fff",
                  width: "68px",
                  height: "36px",
                  border: "1px solid #282828",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "25px",
                  cursor: "pointer",
                }}
                onClick={() => handleMoreBtn()}
              >
                <h5>More</h5>
              </div>
            </div>
            <div className="albumLists">
              <div className="inner_AlbumLists">
                {albumData2.map((data, index) => (
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
                      {/* <ul id="albumArtist">
                        <li>{data.artists[0]}</li>
                      </ul> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* div for trending songs */}
          <div className="musicSelecter firstDiv">
            <div className="headerForMusicDiv">
              <div style={{ display: "flex", gap: "10px" }}>
                <div className="musicLists_title">
                  <h1>Trending</h1>
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
                    className="prevList_Btn"
                    style={{
                      color: positionOfDiv === 0 ? "#282828" : "#fff",
                    }}
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
                    className="nextList_Btn"
                    style={{
                      color: positionOfDiv === 1227 ? "#282828" : "#fff",
                    }}
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
                    <div className="songText">
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
                  <h1>Top 50 of this month</h1>
                </div>
              </div>
              <div className="prev_next_Btn">
                <button
                  onClick={prevScroll2}
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid",
                    borderColor: positionOfDiv2 === 0 ? "#282828" : "#afafaf",
                    cursor: positionOfDiv2 === 0 ? "" : "pointer",
                  }}
                  disabled={positionOfDiv2 === 0}
                >
                  <NavigateBefore
                    className="prevList_Btn"
                    style={{
                      color: positionOfDiv2 === 0 ? "#282828" : "#fff",
                    }}
                  />
                </button>
                <button
                  onClick={nextScroll2}
                  disabled={positionOfDiv2 === 2863}
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid",
                    borderColor:
                      positionOfDiv2 === 2863 ? "#282828" : "#afafaf",
                    cursor: positionOfDiv2 === 2863 ? "" : "pointer",
                  }}
                >
                  <NavigateNext
                    className="nextList_Btn"
                    style={{
                      color: positionOfDiv2 === 2863 ? "#282828" : "#fff",
                    }}
                  />
                </button>
              </div>
            </div>
            <div
              className="musicLists"
              style={{ height: "290px", overflowY: "hidden" }}
            >
              <div
                className="inner_MusicLists"
                style={{
                  transform: `translateX(-${positionOfDiv2}px) `,
                  width: "4090px",
                }}
              >
                {albumData.map((data, index) => (
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
                    <div className="songText">
                      <h4 className="songTitle">{data.title}</h4>
                      <ul className="songArtist">
                        <li>{data.artist[0].name}</li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <SimpleSnackbar
          whenLiked={isSnackbarOpen}
          setIsSnackbarOpen={setIsSnackbarOpen}
          message={"Saved to your likes"}
        />
      </div>
    </div>
  );
}

export default Explore;

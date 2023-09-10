import React, { useState } from "react";
import Drawer1 from "./utils/Drawer1";
import { Avatar } from "@mui/material";
import logoImg from "../img/logo.svg";
import {
  Search,
  Menu,
  Cast,
  PlayArrow,
  ThumbUpAltOutlined,
  MoreVert,
  Close,
  Logout,
  Password,
  ArrowBack,
  YouTube,
} from "@mui/icons-material";
import "../styles/navbar.css";
import SimpleSnackbar from "./utils/SimpleSnackbar";
import { Link, useNavigate } from "react-router-dom";

function Navbar(props) {
  //for userProfile dropdown
  const [isModal2Open, setIsModal2Open] = useState(false);

  //for drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawer = () => {
    setDrawerOpen(!drawerOpen);
    // document.body.classList.toggle("overflowHidden");
  };

  //for search filter
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [searchStatus, setSearchStatus] = useState("");
  const [searchMessage, setSearchMessage] = useState("");
  const searchSong = async (songName) => {
    try {
      const res = await fetch(
        `https://academics.newtonschool.co/api/v1/music/song?filter={"title":"${songName}"}`,
        {
          headers: {
            projectId: "ucnulw1bbazc",
          },
        }
      );
      const resJson = await res.json();
      if (resJson.status === "success") {
        setSearchData(resJson.data[0]);
        setSearchStatus(resJson.status);
      } else {
        setSearchStatus(resJson.status);
        setSearchMessage(resJson.message);
        console.log(resJson.status);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleClose = () => {
    setSearchStatus("");
    setSearchMessage("");
    setSearchInput("");
  };
  //for snackbar when a song is liked
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const openSnackbar = () => {
    setIsSnackbarOpen(true);
  };

  //for log out
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate("/login");
      window.location.reload(true);
    }, 2000);
  };

  //for searchbar in mobile
  const [isSearch4Mob, setIsSearch4Mob] = useState(false);
  const openSearchbar = () => {
    setIsSearch4Mob(true);
  };
  return (
    <div>
      <nav
        style={{
          backgroundColor: props.scrollPosition > 20 ? "#030303" : "#03030300",
          borderBottom: props.scrollPosition > 20 ? "0.2px solid #181818" : "",
        }}
      >
        <div className="nav1">
          <Menu className="menu" onClick={handleDrawer} />
          <img src={logoImg} alt="logo" onClick={() => navigate("/")} />
          <div
            className="flexDiv_4_search"
            style={{ justifyContent: drawerOpen ? "flex-end" : "" }}
          >
            <div className="search_container">
              <Search className="search_icon" />
              <input
                id="search_input"
                type="text"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  searchSong(e.target.value);
                }}
                placeholder="Search songs, albums, artists, podcasts"
              />
              {searchInput === "" ? null : (
                <Close style={{ color: "#a1a1a1" }} onClick={handleClose} />
              )}
            </div>
            <div
              className="searchResult_container"
              id="searchResult_container"
              style={{ display: searchInput === "" ? "none" : "block" }}
            >
              {searchStatus === "success" ? (
                <div className="songContainer" style={{ width: "100%" }}>
                  <div className="overlayForPlayingSongs">
                    <div className="songImgOverlay">
                      <PlayArrow
                        fontSize="large"
                        onClick={() => {
                          props.playSong(searchData, 0);
                        }}
                      />
                    </div>
                    <div className="likeSongDiv">
                      <ThumbUpAltOutlined
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          props.handleLikedSong(searchData);
                          openSnackbar();
                        }}
                      />
                      {/* <MoreVert style={{ cursor: "pointer" }} /> */}
                    </div>
                  </div>
                  <div className="songImg">
                    <img src={searchData.thumbnail} alt="thumbnail" />
                  </div>
                  <div className="songText">
                    <h4 className="songTitle">{searchData.title}</h4>
                    <ul className="songArtist">
                      <li>{searchData.artist[0].name}</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <p
                  style={{
                    color: "#afafaf",
                    fontSize: "14px",
                    padding: "16px",
                  }}
                >
                  {searchMessage}
                </p>
              )}
            </div>
          </div>

          {/* ==================================================== */}
          <div
            className="searchbar4Mobile"
            style={{ display: isSearch4Mob === false ? "none" : "block" }}
          >
            <div
              className="search_container_4Mobile"
              style={{ position: "absolute" }}
            >
              <ArrowBack
                className="search_icon"
                onClick={() => setIsSearch4Mob(false)}
              />
              <input
                id="search_input"
                type="text"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  searchSong(e.target.value);
                }}
                placeholder="Search songs, albums, artists, podcasts"
              />
              {searchInput === "" ? null : (
                <Close style={{ color: "#a1a1a1" }} onClick={handleClose} />
              )}
            </div>
            <div
              className="searchResult_container_4Mobile"
              id="searchResult_container"
              style={{ display: searchInput === "" ? "none" : "block" }}
            >
              {searchStatus === "success" ? (
                <div className="songContainer" style={{ width: "100%" }}>
                  <div className="overlayForPlayingSongs">
                    <div className="songImgOverlay">
                      <PlayArrow
                        fontSize="large"
                        onClick={() => {
                          props.playSong(searchData, 0);
                        }}
                      />
                    </div>
                    <div className="likeSongDiv">
                      <ThumbUpAltOutlined
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          props.handleLikedSong(searchData);
                          openSnackbar();
                        }}
                      />
                      {/* <MoreVert style={{ cursor: "pointer" }} /> */}
                    </div>
                  </div>
                  <div className="songImg">
                    <img src={searchData.thumbnail} alt="thumbnail" />
                  </div>
                  <div className="songText">
                    <h4 className="songTitle">{searchData.title}</h4>
                    <ul className="songArtist">
                      <li>{searchData.artist[0].name}</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <p
                  style={{
                    color: "#afafaf",
                    fontSize: "14px",
                    padding: "16px",
                  }}
                >
                  {searchMessage}
                </p>
              )}
            </div>
          </div>
        </div>
        {/* ==================================================== */}

        <div className="nav2">
          <div className="search4Mobile">
            <Search onClick={openSearchbar} />
          </div>
          <div className="cast" style={{ position: "relative" }}>
            <Cast />
            <div
              style={{
                position: "absolute",
                backgroundColor: "#030303",
                color: "#afafaf",
                whiteSpace: "nowrap",
                padding: "5px",
                fontSize: "12px",
                left: -30,
                borderRadius: "8px",
                display: "none",
              }}
            >
              coming soon.
            </div>
          </div>
          <Avatar
            src="https://yt3.ggpht.com/yti/AOXPAcW6OAwBvclk8TAo4Cy7-92-3eDQYT6JvXCmfrG3HQ=s108-c-k-c0x00ffffff-no-rj"
            style={{
              width: "28px",
              height: "28px",
              cursor: "pointer",
              position: "relative",
            }}
            onClick={() => setIsModal2Open(!isModal2Open)}
          />
          {isModal2Open ? (
            <div
              className="profilePopup"
              style={{
                backgroundColor: "#262626",
                color: "#fff",
              }}
            >
              <div className="popup_name">
                <Avatar
                  className="popup_name_logo"
                  src="https://yt3.ggpht.com/yti/AOXPAcW6OAwBvclk8TAo4Cy7-92-3eDQYT6JvXCmfrG3HQ=s108-c-k-c0x00ffffff-no-rj"
                />
                <div>
                  <h4>{props.userProfile.name}</h4>
                  <p style={{ fontWeight: 300, fontSize: "14px" }}>
                    {props.userProfile.email}
                  </p>
                </div>
              </div>
              <div className="popup_btns">
                <div
                  className="popup_btn"
                  onClick={() => navigate("/music_premium")}
                >
                  <YouTube />
                  <p>Get Music Premium</p>
                </div>
                <div
                  className="popup_btn update"
                  onClick={() => navigate("/password-update")}
                >
                  <Password />
                  <p>Update Password</p>
                </div>
                <div className="popup_btn logout" onClick={handleLogout}>
                  <Logout />
                  <p>Logout</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <Drawer1 open={drawerOpen} handleDrawer={handleDrawer} />
      </nav>
      <SimpleSnackbar
        whenLiked={isSnackbarOpen}
        setIsSnackbarOpen={setIsSnackbarOpen}
        message={"Saved to your likes"}
      />
    </div>
  );
}

export default Navbar;

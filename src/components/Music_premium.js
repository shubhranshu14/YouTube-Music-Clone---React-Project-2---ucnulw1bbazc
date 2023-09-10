import React, { useState } from "react";
import Drawer1 from "./utils/Drawer1";
import { Avatar } from "@mui/material";
import logoImg from "../img/logo.svg";
import ytm_logo from "../img/ytm_logo.png";
import ytm_headset from "../img/ytm_headset.png";
import ytm_download from "../img/ytm_download.png";
import ytm_play from "../img/ytm_play.png";
import "../styles/music_premium.css";
import { Menu, Cast, Password, Logout } from "@mui/icons-material";
import CustomizedDialogs from "./utils/CustomizedDialogs";
import { useNavigate } from "react-router-dom";

function Music_premium(props) {
  //for userProfile dropdown
  const [isModal2Open, setIsModal2Open] = useState(false);

  //for drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawer = () => {
    setDrawerOpen(!drawerOpen);
    // document.body.classList.toggle("overflowHidden");
    document.getElementById("overlay").classList.toggle("overlay");
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
  //for update password
  const handleUpdatePass = () => {};

  return (
    <div id="mainDiv">
      <div id="overlay"></div>
      <nav className="nav4upgrade">
        <div className="nav1">
          <Menu className="menu" onClick={handleDrawer} />
          <img src={logoImg} alt="logo" onClick={() => navigate("/")} />
        </div>
        <div className="nav2">
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

      <div className="container1">
        <div className="ytm_logo_container">
          <img src={ytm_logo} alt="youtube music" />
        </div>
        <h1>
          Get Music Premium to listen to music ad-free, offline and with your
          screen off
        </h1>
        <button onClick={() => navigate("/music_premium/offers")}>
          Get Music Premium
        </button>
        <h2>
          Prepaid and subscription plans available. Prices start at
          ₹99.00/month. Free trials available with subscription plans only.
        </h2>
        <p style={{ marginBottom: "24px" }}>
          Or save money with an
          <span> annual, family or student membership</span>
        </p>
        <CustomizedDialogs />

        <div className="features">
          <div className="feature">
            <img src={ytm_headset} alt="headphone" />
            <h1>Listen in the background</h1>
            <h3>
              Don't worry about your music stopping when you lock your screen or
              use other apps.
            </h3>
          </div>
          <div className="feature">
            <img src={ytm_play} alt="play" />
            <h1>Ad-free music</h1>
            <h3>Listen to the world of music without ads.</h3>
          </div>
          <div className="feature">
            <img src={ytm_download} alt="download" />
            <h1>Download and go</h1>
            <h3>Listen to your favourite music on the go.</h3>
          </div>
        </div>
      </div>
      <div className="container2">
        <div className="story_container story1">
          <div className="message">
            <h1>Background play</h1>
            <h3>
              Turn off the screen and use other apps while your music keeps
              playing.
            </h3>
          </div>
        </div>
        <div className="story_container story2">
          <div className="message" id="msg2">
            <h1>No ads or interruptions on music</h1>
            <h3>
              Easily explore the world of music without any interruptions.
            </h3>
          </div>
        </div>
        <div className="story_container story3">
          <div className="message">
            <h1>Download your favourite tracks</h1>
            <h3>
              No connection? No problem. Take your songs, albums and playlists
              offline.
            </h3>
          </div>
        </div>
        <div className="help_center">
          <h3>
            Have other questions? Visit the <span>YouTube Help Centre</span>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Music_premium;

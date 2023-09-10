import {
  Close,
  ExploreOutlined,
  HomeOutlined,
  LibraryMusicOutlined,
  PlayCircleOutline,
  PushPin,
} from "@mui/icons-material";
import React from "react";
import logoImg from "../../img/logo.svg";
import "../../styles/drawer1.css";
import { NavLink } from "react-router-dom";

function Drawer1(prop) {
  return (
    <div
      className="drawer1"
      style={{ transform: prop.open ? "translateX(0)" : "translateX(-100%)" }}
    >
      <div className="topDiv">
        <div className="closeIcon">
          <Close className="close" onClick={prop.handleDrawer} />
        </div>
        <div className="logo">
          <img src={logoImg} alt="logo" />
        </div>
      </div>
      <div className="listItems">
        <NavLink to="/">
          <div className="item homeIcon">
            <HomeOutlined />
            <h3>Home</h3>
          </div>
        </NavLink>
        <NavLink to="/explore">
          <div className="item exploreIcon">
            <ExploreOutlined />
            <h3>Explore</h3>
          </div>
        </NavLink>
        <NavLink to="/library">
          <div className="item libraryIcon">
            <LibraryMusicOutlined />
            <h3>Library</h3>
          </div>
        </NavLink>
        <NavLink to="/music_premium">
          <div className="item upgradeIcon">
            <PlayCircleOutline />
            <h3>Upgrade</h3>
          </div>
        </NavLink>
      </div>
      <div
        className="likedSongs"
        style={{
          marginTop: "26px",
          paddingTop: "26px",
          borderTop: "0.2px solid #5f5f5f",
        }}
      >
        <NavLink to="/likedSongs">
          <div className="likedSongs_btn">
            <h3>Your likes</h3>
            <div style={{ display: "flex", gap: "5px", marginTop: "4px" }}>
              <PushPin
                fontSize="small"
                style={{ width: "13px", height: "13px", color: "#afafaf" }}
              />
              <h4>Auto playlist</h4>
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default Drawer1;

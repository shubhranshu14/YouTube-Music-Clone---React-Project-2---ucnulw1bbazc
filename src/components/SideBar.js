import {
  ExploreOutlined,
  HomeOutlined,
  LibraryMusicOutlined,
  PlayCircleOutline,
} from "@mui/icons-material";
import React from "react";
import "../styles/sidebar.css";
import { NavLink } from "react-router-dom";

function SideBar(props) {
  return (
    <div
      className="sideBar_container"
      style={{
        backgroundColor: props.scrollPosition > 20 ? "#030303" : "#03030300",
        borderRight: props.scrollPosition > 20 ? "0.2px solid #181818" : "",
      }}
    >
      <div className="links">
        <NavLink to="/">
          <div className="link home_icon">
            <HomeOutlined />
            <p>Home</p>
          </div>
        </NavLink>
        <NavLink to="/explore">
          <div className="link explore_icon">
            <ExploreOutlined />
            <p>Explore</p>
          </div>
        </NavLink>
        <NavLink to="/library">
          <div className="link library_icon">
            <LibraryMusicOutlined />
            <p>Library</p>
          </div>
        </NavLink>
        <NavLink to="/music_premium">
          <div className="link upgrade_icon">
            <PlayCircleOutline />
            <p>Upgrade</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default SideBar;

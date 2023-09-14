import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import BackgroundImage from "./utils/BackgroundImage";
import "../styles/moreAlbum.css";
import homeImg from "../img/library_background.jpg";
import loadImg from "../img/Rolling-1s-203px.svg";
import { Link } from "react-router-dom";
import { PlayArrow } from "@mui/icons-material";

function MoreAlbums(props) {
  const [moreAlbum, setMoreAlbum] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchMoreAlbum = async () => {
    try {
      const res = await fetch(
        "https://academics.newtonschool.co/api/v1/music/album?page=4&limit=100",
        {
          headers: {
            projectId: "ucnulw1bbazc",
          },
        }
      );
      const responseJson = await res.json();
      const responseData = responseJson.data;
      setMoreAlbum(responseData);
      setLoading(false);
      console.log(responseData);
    } catch (err) {
      console.error("got err while fetching morealbum", err);
    }
  };
  useEffect(() => {
    fetchMoreAlbum();
  }, []);

  //for selecting songs from album
  const handleAlbumClick = (album) => {
    props.getAlbumSong(album.songs); // puts all the songs of album in songArr.
  };

  // const element = document.getElementsByClassName("moreAlbum_wrapper");
  // window.addEventListener("scroll", () => {
  //   if (
  //     element.length > 0 &&
  //     window.innerHeight + window.scrollY >= element[0].offsetHeight
  //   ) {
  //     console.log("ready");
  //   }
  // });

  return (
    <div className="moreAlbum">
      <BackgroundImage imgUrl={homeImg} />
      <Navbar
        userProfile={props.userProfile}
        scrollPosition={props.scrollPosition}
        handleLikedSong={props.handleLikedSong}
        playSong={props.playSong}
      />
      <div className="main_container">
        <SideBar scrollPosition={props.scrollPosition} />
        <div className="moreAlbum_mainBody_container">
          <h1>Albums and singles</h1>
          {loading ? (
            <div
              style={{
                color: "white",
                position: "fixed",
                inset: 0,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                style={{ position: "fixed", top: "40%", left: "46%" }}
                src={loadImg}
                alt="loading..."
              />
            </div>
          ) : (
            <div className="moreAlbum_wrapper">
              {moreAlbum.map((data, index) => (
                <div className="moreAlbumContainer" key={index}>
                  <Link
                    to={`/album/${data._id}`}
                    onClick={() => handleAlbumClick(data)}
                  >
                    <div className="moreAlbumImg">
                      <div className="likedOverlay">
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
                    </div>
                  </Link>
                  <div className="albumText">
                    <h4 id="albumTitle">{data.title}</h4>
                    <div
                      style={{ display: "flex", gap: "5px", marginTop: "4px" }}
                    >
                      <h4 style={{ color: "#afafaf" }}></h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MoreAlbums;

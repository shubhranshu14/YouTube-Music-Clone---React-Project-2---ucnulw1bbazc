import React from "react";
// import img from "../../img/home_background.jpg";

function BackgroundImage(props) {
  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        position: "absolute",
        zIndex: -1,
      }}
    >
      <img
        width={"100%"}
        height={"100%"}
        style={{ objectFit: "cover" }}
        src={props.imgUrl}
        alt="backgroundImg"
      />
    </div>
  );
}

export default BackgroundImage;

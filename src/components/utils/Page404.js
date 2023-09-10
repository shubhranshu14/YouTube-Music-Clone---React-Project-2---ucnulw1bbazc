import React from "react";
import img from "../../img/404.jpg";

function Page404() {
  return (
    <div
      style={{
        // backgroundImage: "url(../../img/404.jpg)",
        // backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        userSelect: "none",
      }}
    >
      <img
        style={{ width: "80vw", objectFit: "fill", userSelect: "none" }}
        src={img}
      />
    </div>
  );
}

export default Page404;

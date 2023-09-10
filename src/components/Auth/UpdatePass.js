import React, { useState } from "react";
import logo from "../../img/ytm_logo.png";
import { TextField } from "@mui/material";
import "../../styles/authpage.css";
import { Link, useNavigate } from "react-router-dom";

function UpdatePass(props) {
  const [user, setUser] = useState({
    oldpassword: "",
    newpassword: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const updatePass = async (user) => {
    try {
      const res = await fetch(
        "https://academics.newtonschool.co/api/v1/user/updateMyPassword",
        {
          method: "PATCH",
          headers: {
            projectId: "ucnulw1bbazc",
            Authorization: `Bearer ${props.userProfile.pass}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: props.userProfile.name,
            email: props.userProfile.email,
            passwordCurrent: user.oldpassword,
            password: user.newpassword,
            appType: "music",
          }),
        }
      );

      const restojson = await res.json();
      if (restojson.status === "fail") {
        return setErrMsg(restojson.message);
      }
      setErrMsg("");
      setSuccess(restojson.status);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  };
  const handleUpdate = () => {
    if (user.newpassword === "") {
      return setErrMsg("Please enter password");
    } else if (user.newpassword === user.oldpassword) {
      return setErrMsg("New password cannot be the same as old");
    }
    updatePass(user);
  };
  return (
    <div className="authpage">
      <div className="authpage_overlay"></div>
      <div className="logo">
        <img src={logo} />
      </div>
      <div className="authpage_form_message">
        <div className="authpage_message">
          <h1>Update your password.</h1>
        </div>
        <div className="signup authpage_form">
          <TextField label="Name" value={props.userProfile.name} disabled />
          <TextField label="Email" value={props.userProfile.email} disabled />
          <TextField
            error={errMsg === "" ? false : true}
            label="Current Password"
            type="password"
            value={setUser.oldpassword}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, oldpassword: e.target.value }))
            }
          />
          <TextField
            error={errMsg === "" ? false : true}
            label="New Password"
            type="password"
            value={setUser.newpassword}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, newpassword: e.target.value }))
            }
          />
          {errMsg === "" ? (
            <p
              style={{
                color: "green",
                fontSize: "12px",
                fontWeight: 600,
                textAlign: "center",
                lineHeight: "22px",
              }}
            >
              {success}
            </p>
          ) : (
            <p
              style={{
                color: "red",
                fontSize: "12px",
                fontWeight: 600,
                textAlign: "center",
                lineHeight: "22px",
              }}
            >
              {errMsg}
            </p>
          )}
          <button className="authpage_btn" onClick={handleUpdate}>
            Update
          </button>
          <p style={{ fontSize: "12px", display: "flex" }}>
            Go back to
            <Link to="/">
              <span> Home</span>
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default UpdatePass;

import React, { useState, useEffect } from "react";
import logo from "../../img/ytm_logo.png";
import { TextField } from "@mui/material";
import "../../styles/authpage.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");
  const [tokenNo, setTokenNo] = useState("");
  const navigate = useNavigate();

  const login = async (user) => {
    try {
      const res = await fetch(
        "https://academics.newtonschool.co/api/v1/user/login",
        {
          method: "POST",
          headers: {
            projectId: "ucnulw1bbazc",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            password: user.password,
            appType: "music",
          }),
        }
      );

      const restojson = await res.json();
      if (restojson.status === "fail") {
        return setErrMsg(restojson.message);
      }
      setErrMsg("");
      setTokenNo(restojson.token);
      localStorage.setItem("tokenNo", JSON.stringify(restojson.token));
      setSuccess(restojson.status);
      localStorage.setItem(
        "userProfile",
        JSON.stringify({
          name: restojson.data.name,
          email: restojson.data.email,
          pass: restojson.token,
        })
      );
      // if (restojson.status === "fail") {
      //   return setErrMsg(restojson.message);
      // }
      // setErrMsg("");
      // setTokenNo(restojson.token);
      // setSuccess(restojson.status);
      setTimeout(() => {
        navigate("/");
        window.location.reload(true);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = () => {
    login(user);
  };
  return (
    <div className="authpage">
      <div className="authpage_overlay"></div>
      <div className="logo">
        <img src={logo} />
      </div>
      <div className="authpage_form_message">
        <div className="authpage_message">
          <h1>Log in to Youtube Music.</h1>
        </div>
        <div className="signup authpage_form">
          <TextField
            error={errMsg === "" ? false : true}
            label="Email"
            type="email"
            onChange={(e) =>
              setUser((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <TextField
            error={errMsg === "" ? false : true}
            label="Password"
            type="password"
            onChange={(e) =>
              setUser((prev) => ({ ...prev, password: e.target.value }))
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
          <button className="authpage_btn" onClick={handleLogin}>
            Log in
          </button>
          <p style={{ fontSize: "12px", display: "flex" }}>
            Don't have an account?
            <Link to="/">
              <span>Sign up</span>
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

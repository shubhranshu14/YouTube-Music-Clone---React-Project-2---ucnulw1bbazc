import React, { useState } from "react";
import logo from "../../img/ytm_logo.png";
import { TextField } from "@mui/material";
import "../../styles/authpage.css";
import { Link, useNavigate } from "react-router-dom";

function Signup(props) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const signup = async (user) => {
    try {
      const res = await fetch(
        "https://academics.newtonschool.co/api/v1/user/signup",
        {
          method: "POST",
          headers: {
            projectId: "ucnulw1bbazc",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: user.name,
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
      props.setTokenNo(restojson.token);
      setSuccess(restojson.status);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  };
  const handleSignup = () => {
    signup(user);
  };

  return (
    <div className="authpage">
      <div className="authpage_overlay"></div>
      <div className="logo">
        <img src={logo} />
      </div>
      <div className="authpage_form_message">
        <div className="authpage_message">
          <h1>Sign up for free to start listening.</h1>
        </div>
        <div className="signup authpage_form">
          <TextField
            error={errMsg === "" ? false : true}
            label="Name"
            value={user.name}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, name: e.target.value }))
            }
          />
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
          <button className="authpage_btn" onClick={handleSignup}>
            Sign up
          </button>
          <p style={{ fontSize: "16px", display: "flex" }}>
            Have an account?
            <Link to="/">
              <span>Log in</span>
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;

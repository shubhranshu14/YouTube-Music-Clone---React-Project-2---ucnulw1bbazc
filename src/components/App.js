import React, { useState, useEffect, useReducer } from "react";
import "../styles/App.css";
import MainContainer from "./MainContainer";
import MainAuth from "./Auth/MainAuth";

const App = () => {
  const [isUser, setIsUser] = useState(() => {
    const token = localStorage.getItem("tokenNo");
    if (token) {
      return true;
    }
    return false;
  });

  return isUser ? <MainContainer /> : <MainAuth />;
};

export default App;

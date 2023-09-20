import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Page404 from "../utils/Page404";

function MainAuth() {
  const [tokenNo, setTokenNo] = useState("");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Page404 />} />
        <Route path="/signup" element={<Signup setTokenNo={setTokenNo} />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainAuth;

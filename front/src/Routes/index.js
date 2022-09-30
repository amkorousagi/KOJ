import React from "react";
import { Route } from "react-router-dom";
import Home from "../Pages/Home/index.js";

import { BrowserRouter, Routes } from "react-router-dom";
import Login from "../Pages/Login/index.js";
import About from "../Pages/About/index.js";

import { useRecoilState } from "recoil";
import { isLoginedState } from "../atoms.js";
import Lectures from "../Pages/Lectures/index.js";
import Lecture from "../Pages/Lecture/index.js";
import Code from "../Pages/Code/index.js";
import Score from "../Pages/Score/index.js";
const Router = () => {
  const [isLogined, setIsLogined] = useRecoilState(isLoginedState);
  const localIsLogined = localStorage.getItem("isLogined");
  if (localIsLogined) {
    setIsLogined(JSON.parse(localIsLogined));
  }
  if (isLogined === true) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Lectures />} />
          <Route path="/about" element={<About />} />
          <Route path="/lecture/:lectureId" element={<Lecture />} />
          <Route path="/code/:scoreId" element={<Code />} />
          <Route path="/score/:scoreId" element={<Score />} />
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    );
  }
};

export default Router;

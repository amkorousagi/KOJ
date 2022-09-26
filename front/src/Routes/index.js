import React from "react";
import { Route } from "react-router-dom";
import Home from "../Pages/Home/index.js";

import { BrowserRouter, Routes } from "react-router-dom";
import Login from "../Pages/Login/index.js";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

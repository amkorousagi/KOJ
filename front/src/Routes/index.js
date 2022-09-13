import React from "react";
import { Route } from "react-router-dom";
import Home from "../Pages/Home/index.js";

import { BrowserRouter, Routes } from "react-router-dom";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

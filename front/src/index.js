import React from "react";
import { createRoot } from "react-dom/client";
import Router from "./Routes/index.js";

import { RecoilRoot } from "recoil";

const container = document.getElementById("root");
console.log = function () {}; // production not use console log
const root = createRoot(container);
root.render(
  <RecoilRoot>
    <Router />
  </RecoilRoot>
);

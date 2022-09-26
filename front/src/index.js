import React from "react";
import { createRoot } from "react-dom/client";
import Router from "./Routes/index.js";
import Header from "./Layouts/Header/index.js";
import Footer from "./Layouts/Footer/index.js";

import { RecoilRoot } from "recoil";
import Layout from "./Layouts/index.js";

const container = document.getElementById("root");

const root = createRoot(container);
root.render(
  <RecoilRoot>
    <Layout>
      <Router />
    </Layout>
  </RecoilRoot>
);

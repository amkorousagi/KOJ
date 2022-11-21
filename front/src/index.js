import React from "react";
import { createRoot } from "react-dom/client";
import Router from "./Routes/index.js";

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

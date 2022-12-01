import { Typography } from "@material-ui/core";
import React from "react";

const Footer = () => {
  return (
    <div style={{ display: "block" }}>
      <hr />
      <Typography style={{ fontFamily: "Nanum Gothic" }}>
        &copy; 2022.&nbsp;
        <a
          href="https://github.com/amkorousagi"
          style={{ fontFamily: "Nanum Gothic", fontWeight: 800 }}
        >
          Sechan Park
        </a>
        &nbsp;in&nbsp;
        <a
          href="/about"
          style={{ fontFamily: "Nanum Gothic", fontWeight: 800 }}
        >
          ESE lab
        </a>
        &nbsp;All rights reserved.
        <br />
        <br />
        <br />
        <div style={{ textAlign: "center" }}>
          <a
            href="/lang=ko"
            style={{ fontFamily: "Nanum Gothic", fontWeight: 800 }}
          >
            한국어
          </a>{" "}
          |{" "}
          <a
            href="/lang=en"
            style={{ fontFamily: "Nanum Gothic", fontWeight: 800 }}
          >
            English
          </a>
        </div>
      </Typography>
    </div>
  );
};
export default Footer;

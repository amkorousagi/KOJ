import { Typography } from "@material-ui/core";
import React from "react";

const Footer = () => {
  return (
    <div style={{ marginTop: "auto", bottom: 0 }}>
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
        <a href="/lab" style={{ fontFamily: "Nanum Gothic", fontWeight: 800 }}>
          ESE lab
        </a>
        &nbsp;All rights reserved.
        <br />
        버그 제보 / 문의 및 개선 사항은{" "}
        <a href="mailto:hasmi5452@gmail.com">hasmi5452@gmail.com</a> 으로
        연락주세요.
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
          <button
            id="translateToEnglishButton"
            onClick={() => {
              var translateWidget = document.getElementById(
                "google_translate_element"
              );

              // Find the English language option in the widget and click it to trigger the translation
              var englishOption = translateWidget.querySelector('[value="en"]');
              if (englishOption) {
                englishOption.click();
              }
            }}
            style={{ fontFamily: "Nanum Gothic", fontWeight: 800 }}
          >
            English
          </button>
          <span id="google_translate_element"></span>
        </div>
      </Typography>
    </div>
  );
};
export default Footer;

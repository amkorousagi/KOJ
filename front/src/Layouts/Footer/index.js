import { Typography } from "@material-ui/core";
import React from "react";

const Home = () => {
  return (
    <div>
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
          href="http://selab.knu.ac.kr/dokuwiki/doku.php"
          style={{ fontFamily: "Nanum Gothic", fontWeight: 800 }}
        >
          ESE lab
        </a>
        &nbsp;All rights reserved.
        <br />
        <br />
        연구실 명 : 임베디드소프트웨어공학 연구실 (이우진 교수님)
        <br />
        연구실 관심분야 : SW testing, data science, game AI
        <br />
        오시는 길 : 경북대학교 IT-5호관 523호
        <br />
        문의용 이메일 :{" "}
        <a
          href="mailto:hasmi5452@gmail.com"
          style={{ fontFamily: "Nanum Gothic", fontWeight: 800 }}
        >
          hasmi5452@gmail.com
        </a>
        <br />
        전화 : 053-950-6378
        <br />
        <div
          style={{
            fontFamily: "Nanum Gothic",
            fontWeight: 800,
            textAlign: "right",
          }}
        >
          <a href="/admin">관리자 로그인</a>
        </div>
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
export default Home;

import { Typography } from "@material-ui/core";
import React from "react";

const Home = () => {
  return (
    <div>
      <hr />
      <Typography style={{ fontFamily: "Nanum Gothic" }}>
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
      </Typography>
    </div>
  );
};
export default Home;

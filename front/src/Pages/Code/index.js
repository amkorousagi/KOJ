import { Card, Typography, Box, CardContent } from "@material-ui/core";
import React from "react";

const Code = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{ textAlign: "left" }}
    >
      <Card variant="outlined">
        <CardContent>
          <Typography style={{ fontFamily: "Nanum Gothic" }}>
            <div style={{ textAlign: "center" }}>연구실 소개</div>
            <hr />
            <br />
            연구실 명 : 임베디드소프트웨어공학 연구실 (이우진 교수님)
            <br />
            연구실 관심분야 : SW testing, data science, game AI
            <br />
            오시는 길 : 경북대학교 IT-5호관 523호
            <br />
            문의용 이메일 : hasmi5452@gmail.com
            <br />
            전화 : 053-950-6378
            <br />
            연구실 홈페이지 :{" "}
            <a
              href="http://selab.knu.ac.kr/dokuwiki/doku.php"
              style={{ fontFamily: "Nanum Gothic", fontWeight: 800 }}
            >
              selab
            </a>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
export default Code;

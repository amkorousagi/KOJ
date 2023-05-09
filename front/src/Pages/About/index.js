import { Card, Typography, Box, CardContent } from "@material-ui/core";
import React from "react";

const About = () => {
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
            <div style={{ textAlign: "center" }}>KOJ 소개</div>
            <hr />
            <br />
            KOJ는 경북대학교 온라인 채점 시스템입니다.
            <br />
            KOJ의 기능은 다음과 같습니다.
            <br />
            <ul>
              <li>공통</li>
              <ul>
                <li>로그인</li>
                <li>비밀번호 변경</li>
                <li>KOJ 소개 및 연구실 소개</li>
              </ul>
              <li>학생 및 튜터(단, 튜터는 성적처리에 반영되지 않음)</li>
              <ul>
                <li>강의 목록 및 강의 자료 Read</li>
                <li>실습 및 문제 Read</li>
                <li>코드 제출 및 제출된 코드 확인</li>
                <li>채점 기록 및 채점 결과 상세 확인</li>
                <li>채점 결과 상세 확인</li>
              </ul>
              <li>교수</li>
              <ul>
                <li>강의 및 강의 자료 CRUD(Create/Read/Update/Delete)</li>
                <li>학생 등록</li>
                <li>실습 및 문제, 테스트 케이스 CRUD</li>
                <li>코드 제출 및 제출된 코드 확인</li>
                <li>채점 기록 및 채점 결과 상세 확인</li>
                <li>전체 성적 보기 및 실습 당 성적 보기</li>
                <li>전체 실습 재채점 및 한 문제 재채점, 제출 하나 재채점</li>
              </ul>
              <li>관리자</li>
              <ul>
                <li>교수 추가</li>
                <li>비밀번호 초기화</li>
                <li>채점 데이터 관리 및 다운로드</li>
              </ul>
            </ul>
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
export default About;

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
            KOJ의 특징은 다음과 같습니다.
            <ul>
              <li>성적처리</li>
              <li>재채점</li>
              <li>부분점수</li>
              <li>복수 파일 컴파일 및 실행</li>
            </ul>
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
            <br />
            채점 환경 : ubuntu 18.04 LTS
            <br />
            <ul>
              <li>C99</li>
              <ul>
                <li>컴파일 : gcc -std=c99 Main.c -lm -o Main</li>
                <li>실행 : ./Main</li>
                <li>버전 : gcc 10.2.1</li>
              </ul>
              <li>C++17</li>
              <ul>
                <li>컴파일 : g++ -std=c++17 Main.c -lm -o Main</li>
                <li>실행 : ./Main</li>
                <li>버전 : g++ 10.2.1</li>
              </ul>
              <li>Java 11</li>
              <ul>
                <li>컴파일 : javac -cp . ./*.java</li>
                <li>실행 : java Main</li>
                <li>버전 : openjdk version "16.0.1" 2021-04-20</li>
              </ul>
              <li>Python 3</li>
              <ul>
                <li>컴파일 : X</li>
                <li>실행 : python3 Main.py</li>
                <li>버전 : Python 3.9.2</li>
              </ul>
              <li>node.js</li>
              <ul>
                <li>컴파일 : X</li>
                <li>실행 : node Main.js</li>
                <li>버전 : node v18.14.2</li>
              </ul>
            </ul>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
export default About;

import {
  Card,
  Typography,
  Box,
  CardContent,
  CardHeader,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import React from "react";

const LectureList = ({ title, lectureList }) => {
  const lectures = lectureList.map((item) => (
    <ListItem>
      <Button
        style={{
          width: "100%",
          textAlign: "left",
        }}
        onClick={() => {
          window.location.href = "/lecture/" + item.id;
        }}
      >
        <ListItemText primary={item.title} secondary={item.professor} />
      </Button>
    </ListItem>
  ));
  return (
    <Card variant="outlined">
      <CardContent style={{ minWidth: 500 }}>
        <Typography style={{ fontFamily: "Nanum Gothic" }}>
          <div style={{ textAlign: "center", fontWeight: 700, fontSize: 20 }}>
            {title}
          </div>
          <hr />
        </Typography>
        <List
          style={{
            width: "100%",
            backgroundColor: "#F0F0F0",
          }}
        >
          {lectures}
        </List>
      </CardContent>
    </Card>
  );
};

const Lectures = () => {
  const curLectureList = [
    { title: "기초 프로그래밍 강의", professor: "이우진 교수님", id: 1 },
    { title: "고급 문제해결 강의", professor: "이시형 교수님", id: 2 },
  ];
  const preLectureList = [
    { title: "자바 프로그래밍 강의", professor: "정숙영 교수님", id: 1 },
    { title: "알고리즘2 강의", professor: "유관우 교수님", id: 2 },
  ];
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ textAlign: "left" }}
      >
        <LectureList title="이번 학기 강의목록" lectureList={curLectureList} />
      </Box>
      <br />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ textAlign: "left" }}
      >
        <LectureList title="지난 학기 강의목록" lectureList={preLectureList} />
      </Box>
    </>
  );
};
export default Lectures;

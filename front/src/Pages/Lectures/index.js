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

const LectureList = ({ title }) => {
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
          <ListItem>
            <Button
              style={{
                width: "100%",
                textAlign: "left",
              }}
            >
              <ListItemText
                primary="기초 프로그래밍 강의"
                secondary="이우진 교수님"
              />
            </Button>
          </ListItem>
          <ListItem>
            <Button
              style={{
                width: "100%",
                textAlign: "left",
              }}
            >
              <ListItemText
                primary="고급 알고리즘 강의"
                secondary="이시형 교수님"
              />
            </Button>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

const Lectures = () => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ textAlign: "left" }}
      >
        <LectureList title="이번 학기 강의목록" />
      </Box>
      <br />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ textAlign: "left" }}
      >
        <LectureList title="지난 학기 강의목록" />
      </Box>
    </>
  );
};
export default Lectures;

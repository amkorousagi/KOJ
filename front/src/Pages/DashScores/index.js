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
import React, { useEffect } from "react";
import DashScoreList from "../../Components/DashScoreList.js";
import { BASE_URL } from "../../config.js";

const DashScores = ({ userType, userId }) => {
  const [cur, setCur] = React.useState([]);
  const [pre, setPre] = React.useState([]);

  useEffect(() => {
    const body = {};
    if (userType === "professor") {
      body["lecturer"] = userId;
    } else if (userType === "tutor") {
      body["student"] = userId;
    } else if (userType === "student") {
      body["student"] = userId;
    } else {
      console.log("userType Error " + userType);
    }
    fetch(BASE_URL + "/api/readLecture", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const c = [];
        const p = [];
        const y = new Date(Date.now()).getFullYear();
        for (const l of data.data) {
          if (Number(l.semester.substr(0, 4)) < Number(y)) {
            p.push(l);
          } else {
            c.push(l);
          }
        }
        setCur(c);
        setPre(p);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ textAlign: "left" }}
      >
        <DashScoreList
          title="이번 학기 강의 성적"
          lectureList={cur}
          userType={userType}
          userId={userId}
          isCur={true}
        />
      </Box>
      <br />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ textAlign: "left" }}
      >
        <DashScoreList
          title="지난 학기 강의 성적"
          lectureList={pre}
          userType={userType}
          userId={userId}
          isCur={false}
        />
      </Box>
    </>
  );
};
export default DashScores;

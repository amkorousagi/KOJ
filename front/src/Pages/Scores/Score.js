import {
  Card,
  Box,
  CardContent,
  Button,
  Modal,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { BASE_URL } from "../../config.js";

const Scores = ({ userId }) => {
  const [submissions, setSubmissions] = React.useState([]);
  const submissions_components = submissions.map((item) => {
    let correct = true;
    for (const i of item.success) {
      if (i === false) {
        correct = false;
        break;
      }
    }
    console.log(item.state);
    return (
      <TableRow>
        <TableCell>{item.state}</TableCell>
        <TableCell
          style={{
            color:
              item.success.length === 0
                ? item.state === "done"
                  ? "red"
                  : "green"
                : correct
                ? "green"
                : "red",
          }}
        >
          {item.success.length === 0
            ? item.state === "done"
              ? "채점불가"
              : "채점중"
            : correct
            ? "맞았습니다"
            : "틀렸습니다"}
        </TableCell>
        <TableCell>
          <Button
            onClick={() => {
              window.location.href = "/code/" + item._id;
            }}
            style={{ fontWeight: 800 }}
          >
            코드
          </Button>
        </TableCell>
        <TableCell>
          <Button
            onClick={() => {
              window.location.href = "/score/" + item._id;
            }}
            style={{ fontWeight: 800 }}
          >
            실행결과
          </Button>
        </TableCell>
        <TableCell>
          {new Date(item.created_date).toLocaleString("ko-KR")}
        </TableCell>
      </TableRow>
    );
  });
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch(BASE_URL + "/api/readSubmission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          student: userId,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("score ", data);
          const ss = data.data;
          setSubmissions(
            ss.sort((a, b) => {
              if (a.created_date > b.created_date) {
                return -1;
              }
              if (a.created_date < b.created_date) {
                return 1;
              }
              return 0;
            })
          );
          let all_done = true;
          ss.map((item) => {
            if (item.state !== "done") {
              all_done = false;
            }
          });
          if (all_done) {
            console.log("close");
            clearInterval(intervalId);
          }
        });
    }, 1000);
  }, []);

  return (
    <Card variant="outlined">
      <br />
      <Typography style={{ textAlign: "center", fontWeight: 800 }}>
        채점기록
      </Typography>
      <hr />
      <CardContent>
        <TableContainer component={Paper} style={{ maxHeight: "80vh" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>상태</TableCell>
                <TableCell width="70">결과</TableCell>
                <TableCell>코드</TableCell>
                <TableCell width="90">실행결과</TableCell>
                <TableCell>시간</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{submissions_components}</TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
export default Scores;

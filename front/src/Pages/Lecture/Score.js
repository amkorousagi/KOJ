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
} from "@material-ui/core";
import React, { useEffect } from "react";
import { BASE_URL } from "../../config.js";

const IsClose = ({ open }) => {
  if (open) {
    return <div className="isClose" hidden></div>;
  } else {
    return <></>;
  }
};

const Score = ({ open, handleClose, problemId, userId }) => {
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
        <TableCell>
          <Button
            onClick={() => {
              window.location.href = "/code/" + item._id;
            }}
            style={{ fontWeight: 800 }}
          >
            소스코드
          </Button>
        </TableCell>
        <TableCell>
          <Button
            onClick={() => {
              window.location.href = "/score/" + item._id;
            }}
            style={{ fontWeight: 800 }}
          >
            채점결과
          </Button>
        </TableCell>
        <TableCell>
          {new Date(item.created_date).toLocaleString("ko-KR")}
        </TableCell>
      </TableRow>
    );
  });

  useEffect(() => {
    let intervalId;
    let isClose;
    intervalId = setInterval(() => {
      isClose = document.querySelector(".isClose");
      if (isClose) {
        console.log(problemId, userId);
        fetch(BASE_URL + "/api/readSubmission", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            problem: problemId,
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
          });
      } else {
        console.log("close");
        clearInterval(intervalId);
      }
    }, 1000);
  }, [open]);

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{
            textAlign: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Card variant="outlined">
            <CardContent>
              <TableContainer component={Paper} style={{ maxHeight: "80vh" }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>결과</TableCell>
                      <TableCell>소스코드 보기</TableCell>
                      <TableCell>채점결과 상세 보기</TableCell>
                      <TableCell>제출한 시간</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{submissions_components}</TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      </Modal>
      <IsClose open={open} />
    </div>
  );
};
export default Score;

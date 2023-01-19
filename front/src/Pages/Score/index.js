import {
  Card,
  Box,
  CardContent,
  Button,
  Table,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core";
import { maxHeight } from "@mui/system";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../config.js";

const Score = () => {
  const { submissionId } = useParams();
  const [submission, setSubmission] = React.useState({});
  const [testcases, setTestcases] = React.useState([]);

  useEffect(() => {
    fetch(BASE_URL + "/api/readSubmission", {
      method: "POST",
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: submissionId,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setSubmission(data.data);
        fetch(BASE_URL + "/api/readTestcase", {
          method: "POST",
          headers: {
            Authorization: "bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            problem: data.data.problem,
          }),
        })
          .then((res) => {
            return res.json();
          })
          .then((d) => {
            console.log(d);

            setTestcases(d.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const content = () => {
    const item = submission;
    let c = <></>;
    console.log(item);
    console.log(testcases);
    if (item.success !== undefined && testcases.length !== 0) {
      c = item.success.map((s, i) => {
        return (
          <Paper style={{ padding: "5px", margin: "5px" }}>
            <Typography style={{ fontFamily: "Nanum Gothic", fontWeight: 800 }}>
              {testcases[i].title} :{" "}
              <span style={{ color: s ? "green" : "red" }}>
                {s ? "맞았습니다" : "틀렸습니다."}
              </span>
            </Typography>
            <hr />
            <br />
            <br />
            <TextField
              disabled
              variant="outlined"
              label="주어진 표준입력"
              defaultValue={
                testcases[i].input_text ? testcases[i].input_text : "없음"
              }
              multiline
              fullWidth
            />
            <br />
            <br />
            <br />
            <TextField
              disabled
              variant="outlined"
              label="정답 표준출력"
              defaultValue={
                testcases[i].output_text ? testcases[i].output_text : "없음"
              }
              multiline
              fullWidth
            />
            <br />
            <br />
            <br />
            <TextField
              disabled
              variant="outlined"
              label="실제 표준출력"
              multiline
              fullWidth
              defaultValue={item.stdout[i] ? item.stdout[i] : "없음"}
            />
            <br />
            <br />
            <br />
            <br />
            <TextField
              disabled
              variant="outlined"
              label="표준오류"
              multiline
              fullWidth
              defaultValue={item.stderr[i] ? item.stderr[i] : "없음"}
            />
            <br />
            <br />
            <br />
            <br />
            <TextField
              disabled
              variant="outlined"
              label="오류 코드"
              multiline
              fullWidth
              defaultValue={item.exit_code[i] ? item.exit_code[i] : "없음"}
            />
            <br />
            <br />
            <br />
            <TextField
              disabled
              variant="outlined"
              label="에러"
              multiline
              fullWidth
              defaultValue={item.error[i] ? item.error[i] : "없음"}
            />
            <br />
            <br />
            <br />
            <TextField
              disabled
              variant="outlined"
              label="피드백"
              fullWidth
              multiline
              defaultValue={item.feedback[i] ? item.feedback[i] : "없음"}
            />
            <br />
            <br />
            <br />
          </Paper>
        );
      });
    }
    return (
      <TableRow>
        <TableCell>{c}</TableCell>
      </TableRow>
    );
  };
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Card variant="outlined">
        <CardContent>
          <Table style={{ textAlign: "left", width: "70vw" }}>
            {content()}
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
};
export default Score;

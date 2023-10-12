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
  FormLabel,
  Grid,
} from "@material-ui/core";
import { maxHeight } from "@mui/system";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../config.js";

const HighlightDiff = ({ answer, result }) => {
  const differences = [];

  const answerLine = answer.split("\n");
  const resultLine = result.split("\n");

  for (let i = 0; i < resultLine.length; i++) {
    if (answerLine.length <= i) {
      differences.push(
        <div
          className="coding"
          key={i}
          style={{
            backgroundColor: "yellow",
            color: "green",
          }}
        >
          {resultLine[i]}
        </div>
      );
      continue;
    }
    const a = answerLine[i];
    const r = resultLine[i];
    const l = a.length > r.length ? a.length : r.length;
    const lineDifferences = [];
    for (let j = 0; j < l; j++) {
      if (a.length <= j) {
        lineDifferences.push(
          <span
            className="coding"
            key={j}
            style={{
              backgroundColor: "yellow",
              color: "green",
            }}
          >
            {r[j]}
          </span>
        );
        continue;
      }
      if (r.length <= j) {
        lineDifferences.push(
          <span
            className="coding"
            key={j}
            style={{
              backgroundColor: "yellow",
              color: "red",
            }}
          >
            {"ㅁ"}
          </span>
        );
        continue;
      }
      if (a[j] !== r[j]) {
        lineDifferences.push(
          <span
            className="coding"
            key={j}
            style={{
              backgroundColor: "yellow",
              color: "red",
            }}
          >
            {r[j]}
          </span>
        );
      } else {
        lineDifferences.push(
          <span className="coding" key={j}>
            {r[j]}
          </span>
        );
      }
    }
    console.log(lineDifferences);
    differences.push(
      <div className="coding" key={i}>
        {lineDifferences}
      </div>
    );
  }

  return (
    <div
      className="coding"
      style={{
        color: "black",
        whiteSpace: "pre",
      }}
    >
      {differences}
    </div>
  );
};

const Content = ({ submission, testcases }) => {
  const item = submission;
  let c = <>채점된 테스트케이스가 존재하지 않습니다.</>;
  console.log(item);
  console.log(testcases);
  if (item.success !== undefined && testcases.length !== 0) {
    c = item.success.map((s, i) => {
      return (
        <Paper style={{ padding: "5px", margin: "15px 0px" }}>
          <Typography style={{ fontFamily: "Nanum Gothic", fontWeight: 800 }}>
            {testcases[i].title}
            {testcases[i].hidden ? "(비공개)" : "(공개)"} :{" "}
            <span style={{ color: s ? "green" : "red" }}>
              {s ? "맞았습니다" : "틀렸습니다."}
            </span>
          </Typography>
          <hr />
          <br />
          <Grid container spacing={5} style={{ margin: 2 }}>
            <Grid item xs={7}>
              <TextField
                InputLabelProps={{ style: { color: "black" } }}
                inputProps={{ style: { color: "black" } }}
                disabled
                variant="outlined"
                label="주어진 표준입력"
                defaultValue={
                  testcases[i].hidden
                    ? "비공개"
                    : testcases[i].input_text
                    ? testcases[i].input_text
                    : "없음"
                }
                multiline
                fullWidth
              />
              <br />
              <br />
              <br />
              <TextField
                InputLabelProps={{ style: { color: "black" }, shrink: true }}
                disabled
                variant="outlined"
                label="실제 표준출력"
                multiline
                fullWidth
                InputProps={{
                  inputComponent: () => (
                    <HighlightDiff
                      answer={testcases[i].output_text}
                      result={item.stdout[i] ? item.stdout[i] : "없음"}
                    />
                  ),
                }}
              />
              <br />
              <br />
              <br />
              <TextField
                InputLabelProps={{ style: { color: "black" } }}
                inputProps={{ style: { color: "black" } }}
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
            </Grid>
            <Grid item sx={3}>
              <TextField
                InputLabelProps={{ style: { color: "black" } }}
                inputProps={{ style: { color: "black" } }}
                disabled
                variant="outlined"
                label="에러 유형"
                multiline
                fullWidth
                defaultValue={
                  item.error_type[i] === "" ? "없음" : item.error_type[i]
                }
              />
              <br />
              <br />
              <br />
              <TextField
                InputLabelProps={{ style: { color: "black" } }}
                inputProps={{ style: { color: "black" } }}
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
                InputLabelProps={{ style: { color: "black" } }}
                inputProps={{ style: { color: "black" } }}
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
            </Grid>
          </Grid>
        </Paper>
      );
    });
  }
  return (
    <>
      {c.length === 0 ? (
        <Typography style={{ textAlign: "center" }}>
          테스트 케이스가 존재하지 않습니다.
        </Typography>
      ) : (
        c
      )}
    </>
  );
};

const Score = () => {
  const { submissionId } = useParams();
  const [submission, setSubmission] = React.useState({});
  const [testcases, setTestcases] = React.useState([]);
  console.log(submissionId);
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
  }, [submissionId]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      style={{ margin: 5 }}
    >
      <Grid item xs={12}>
        <Box justifyContent="center" alignItems="center">
          <Typography>
            초과된 출력은{" "}
            <span
              style={{
                backgroundColor: "yellow",
                color: "green",
              }}
            >
              {"초 과"}
            </span>
            ,오답인 출력은{" "}
            <span
              style={{
                backgroundColor: "yellow",
                color: "red",
              }}
            >
              {"오 답"}
            </span>
            , 부족한 출력은{" "}
            <span
              style={{
                backgroundColor: "yellow",
                color: "red",
              }}
            >
              {"□"}
            </span>
          </Typography>
          <Card variant="outlined">
            <CardContent style={{ minWidth: "80vw" }}>
              <Content submission={submission} testcases={testcases} />
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
};
export default Score;

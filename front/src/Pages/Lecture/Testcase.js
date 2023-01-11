import {
  Card,
  Typography,
  Box,
  CardContent,
  Button,
  Modal,
  FormLabel,
  Paper,
} from "@material-ui/core";
import React from "react";
import { FILE_URL } from "../../config.js";

const Testcase = ({ open, handleClose, testcase }) => {
  console.log(testcase);

  return (
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
          padding: "5px",
        }}
      >
        <Card variant="outlined">
          <Typography style={{ fontFamily: "Nanum Gothic" }}>
            <div style={{ textAlign: "center" }}>{testcase.title}</div>
          </Typography>
          <hr />
          <CardContent>
            <Typography>점수 : {testcase.score} 점</Typography>
            <br />
            <br />
            <Typography style={{ margin: "5px" }}>표준 입력:</Typography>
            <Paper>
              <Typography
                style={{
                  padding: "5px",
                  textAlign: "left",
                }}
              >
                {testcase.input_text === "" ? "없음" : testcase.input_text}
              </Typography>
            </Paper>
            <br />
            <br />
            <Typography style={{ margin: "5px" }}>표준 출력:</Typography>

            <Paper>
              <Typography
                style={{
                  padding: "5px",
                  textAlign: "left",
                }}
              >
                {testcase.output_text === "" ? "없음" : testcase.output_text}
              </Typography>
            </Paper>
            <br />
            <br />
            <Typography>
              입력 파일 수 : {testcase.input_file.length} 개
            </Typography>
            <Typography>
              출력 파일 수 : {testcase.output_file.length} 개
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};
export default Testcase;

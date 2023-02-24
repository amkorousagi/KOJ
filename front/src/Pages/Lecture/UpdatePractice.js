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
  TextField,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Add, Close, Save } from "@mui/icons-material";
import React, { useEffect } from "react";
import { BASE_URL } from "../../config.js";

const UpdatePractice = ({
  open,
  handleClose,
  lecture_id,
  nPractice,
  curPractice,
}) => {
  const now = new Date(Date.now());
  const [name, setName] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  //lecture id 보내기

  const updatePractice = () => {
    const update = { practice: curPractice._id };
    if (name) {
      update.title = name;
    }
    if (startDate) {
      update.start_date = startDate;
    }
    if (endDate) {
      update.end_date = endDate;
    }
    fetch(BASE_URL + "/api/updatePractice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(update),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.success) {
          handleClose();
          window.location.reload();
        } else {
          console.log("error");
        }
      });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{
          textAlign: "left",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(2, 2)",
          "backface-visibility": "hidden",
          zoom: 0.5,
        }}
      >
        <Card variant="outlined" style={{ minWidth: "500px" }}>
          <IconButton
            style={{ position: "absolute", top: 0, right: 0 }}
            onClick={handleClose}
          >
            <Close />
          </IconButton>
          <br />
          <Typography style={{ textAlign: "center", fontWeight: 800 }}>
            실습 수정
          </Typography>
          <hr />
          <CardContent>
            <TextField
              key={curPractice.title}
              variant="outlined"
              label="실습명"
              style={{ width: "100%" }}
              defaultValue={curPractice.title}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <br />
            <br />
            <TextField
              key={curPractice.start_date}
              variant="outlined"
              label="시작 시간"
              style={{ width: "100%" }}
              defaultValue={curPractice.start_date}
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
            />
            <br />
            <br />
            <TextField
              key={curPractice.end_date}
              variant="outlined"
              label="종료 시간"
              style={{ width: "100%" }}
              defaultValue={curPractice.end_date}
              onChange={(e) => {
                setEndDate(e.target.value);
              }}
            />
            <br />
            <br />
            <Button
              variant="contained"
              style={{ margin: "5px" }}
              startIcon={<Save />}
              onClick={updatePractice}
            >
              실습 수정
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};
export default UpdatePractice;

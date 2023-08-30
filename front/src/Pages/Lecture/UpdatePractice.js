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
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs/index.js";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/index.js";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker/index.js";
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
    if (startDate <= endDate) {
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
    } else {
      alert("종료날짜가 시작날짜보다 이릅니다.");
    }
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
          maxHeight: "calc(100vh - 200px)",
          overflowY: "auto",
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="시작 날짜"
                value={curPractice.start_date}
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    style={{ width: "100%" }}
                    {...params}
                  />
                )}
              />

              <br />
              <br />
              <DateTimePicker
                label="종료 날짜"
                value={curPractice.end_date}
                onChange={(newValue) => {
                  setEndDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    style={{ width: "100%" }}
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
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

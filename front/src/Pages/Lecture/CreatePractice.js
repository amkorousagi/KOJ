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
  CardHeader,
  Typography,
} from "@material-ui/core";
import { Add, Close, Save } from "@mui/icons-material";
import React, { useEffect } from "react";
import { BASE_URL } from "../../config.js";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs/index.js";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/index.js";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker/index.js";

const CreatePractice = ({ open, handleClose, lecture_id, nPractice }) => {
  const [name, setName] = React.useState("실습 " + (nPractice + 1));
  const [startDate, setStartDate] = React.useState(dayjs());
  const [endDate, setEndDate] = React.useState(dayjs());
  useEffect(() => {
    setName("실습 " + (nPractice + 1));
  }, [nPractice]);
  //lecture id 보내기
  const createPractice = () => {
    if (startDate <= endDate) {
      fetch(BASE_URL + "/api/createPractice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          lecture: lecture_id,
          title: name,
          start_date: startDate.format(),
          end_date: endDate.format(),
        }),
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
          transform: "translate(-50%, -50%)",
          "backface-visibility": "hidden",
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
            실습 생성
          </Typography>
          <hr />
          <CardContent>
            <TextField
              variant="outlined"
              label="실습명"
              style={{ width: "100%" }}
              defaultValue={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <br />
            <br />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="시작 날짜"
                value={startDate}
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
                value={endDate}
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
              onClick={createPractice}
            >
              실습 저장
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};
export default CreatePractice;

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
} from "@material-ui/core";
import { Add, Save } from "@mui/icons-material";
import React, { useEffect } from "react";
import { BASE_URL } from "../../config.js";

const CreatePractice = ({ open, handleClose, lecture_id, nPractice }) => {
  const now = new Date(Date.now());
  const [name, setName] = React.useState("실습 " + (nPractice + 1));
  const [startDate, setStartDate] = React.useState(now.toLocaleString("en-US"));
  const [endDate, setEndDate] = React.useState(now.toLocaleString("en-US"));
  useEffect(() => {
    setName("실습 " + (nPractice + 1));
  }, [nPractice]);
  //lecture id 보내기
  const createPractice = () => {
    fetch(BASE_URL + "/api/createPractice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        lecture: lecture_id,
        title: name,
        start_date: startDate,
        end_date: endDate,
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
  };

  const rows = [
    {
      result: "맞았습니다",
      scoreId: 1,
      createDate: new Date("2022-09-17T03:24:00"),
    },
    {
      result: "틀렸습니다",
      scoreId: 2,
      createDate: new Date("2022-09-17T00:24:00"),
    },
  ];
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
          <CardContent>
            <TextField
              key={name}
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
            <TextField
              variant="outlined"
              label="시작 시간"
              style={{ width: "100%" }}
              defaultValue={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
            />
            <br />
            <br />
            <TextField
              variant="outlined"
              label="종료 시간"
              style={{ width: "100%" }}
              defaultValue={endDate}
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

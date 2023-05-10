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
  ListItemText,
  Typography,
  ListItem,
} from "@material-ui/core";
import { Add, Close, Save } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config.js";

const UpdateUserPassword = ({ open, handleClose }) => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  //lecture id 보내기
  const updateUserPassword = () => {
    if (newPassword === newPassword2) {
      fetch(BASE_URL + "/api/updateUserPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          password,
          newPassword,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          if (data.success) {
            if (data.data.success) {
              alert(data.data.message);
              handleClose();
            } else {
              alert(data.data.message);
            }
          } else {
            alert(data.error);
            console.log("error");
          }
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("새로운 비밀번호가 일치하지않습니다.");
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
          <Typography
            style={{ textAlign: "center", fontSize: 20, fontWeight: 800 }}
          >
            비밀번호 변경
          </Typography>
          <hr />
          <CardContent>
            <TextField
              variant="outlined"
              label="현재 비밀번호"
              type="password"
              style={{ width: "100%" }}
              defaultValue={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br />
            <br />
            <TextField
              variant="outlined"
              label="새로운 비밀번호"
              type="password"
              style={{ width: "100%" }}
              defaultValue={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
            <br />
            <br />
            <TextField
              variant="outlined"
              label="새로운 비밀번호 확인"
              type="password"
              style={{ width: "100%" }}
              defaultValue={newPassword2}
              onChange={(e) => {
                setNewPassword2(e.target.value);
              }}
            />
            <br />
            <br />
            <Button
              variant="contained"
              style={{ margin: "5px" }}
              startIcon={<Save />}
              onClick={updateUserPassword}
            >
              비밀번호 변경
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};
export default UpdateUserPassword;

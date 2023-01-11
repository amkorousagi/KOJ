import {
  Card,
  Typography,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Icon,
  IconButton,
} from "@material-ui/core";
import { Add } from "@mui/icons-material";
import React from "react";
import { BASE_URL } from "../config.js";

const CreateLecture = ({ userType, isCur, userId }) => {
  const [year, setYear] = React.useState("");
  const [season, setSeason] = React.useState("");
  const [title, setTitle] = React.useState("");
  if (isCur === true && userType === "professor") {
    const today = new Date(Date.now());
    const current_year = today.getFullYear();
    const next_year = String(Number(current_year) + 1);

    const createLecture = () => {
      if (year === "" || season === "") {
        alert("년도 또는 학기를 선택하세요!");
      }
      fetch(BASE_URL + "/api/createLecture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title,
          semester: year + season,
          lecturer: userId,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    };

    return (
      <>
        <hr style={{ width: "95%" }} />
        <Typography style={{ fontWeight: 800, textAlign: "center" }}>
          새로운 강의 만들기
        </Typography>
        <ListItem style={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton onClick={createLecture}>
            <Add />
          </IconButton>
          <InputLabel>강의명 : </InputLabel>
          <TextField
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          &nbsp;
          <Select
            label="년도"
            onChange={(e) => {
              setYear(e.target.value);
            }}
          >
            <MenuItem value={current_year}>{current_year}</MenuItem>
            <MenuItem value={next_year}>{next_year}</MenuItem>
          </Select>
          <InputLabel>년도</InputLabel>
          &nbsp;&nbsp;
          <Select
            label="학기"
            onChange={(e) => {
              setSeason(e.target.value);
            }}
          >
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="S">여름 계절</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="W">겨울 계절</MenuItem>
          </Select>
          <InputLabel>학기</InputLabel>
        </ListItem>
      </>
    );
  } else {
    return <></>;
  }
};

const LectureList = ({ userType, userId, title, lectureList, isCur }) => {
  const lectures = lectureList.map((item) => (
    <ListItem>
      <Button
        style={{
          width: "100%",
          textAlign: "left",
        }}
        onClick={() => {
          window.location.href = "/lecture/" + item._id + "/" + item.title;
        }}
      >
        <ListItemText
          primary={item.title + " (" + item.semester + ")"}
          secondary={item.lecturer.name + " 교수님"}
        />
      </Button>
    </ListItem>
  ));
  return (
    <Card variant="outlined">
      <CardContent style={{ minWidth: 500 }}>
        <Typography style={{ fontFamily: "Nanum Gothic" }}>
          <div style={{ textAlign: "center", fontWeight: 700, fontSize: 20 }}>
            {title}
          </div>
          <hr />
        </Typography>
        <List
          style={{
            width: "100%",
            backgroundColor: "#F0F0F0",
          }}
        >
          {lectures}

          <CreateLecture userType={userType} isCur={isCur} userId={userId} />
        </List>
      </CardContent>
    </Card>
  );
};
export default LectureList;

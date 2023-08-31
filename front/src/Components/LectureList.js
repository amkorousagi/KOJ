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
  Modal,
  Box,
} from "@material-ui/core";
import {
  Add,
  BrowserUpdatedOutlined,
  Close,
  CloseOutlined,
  Delete,
  Edit,
  SecurityUpdate,
  SystemUpdate,
  Update,
  Upgrade,
  UpgradeTwoTone,
} from "@mui/icons-material";
import { ListItemButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config.js";

const CreateLecture = ({ userType, isCur, userId }) => {
  const [year, setYear] = React.useState("");
  const [season, setSeason] = React.useState("");
  const [title, setTitle] = React.useState("");
  if (isCur === true && userType === "professor") {
    const today = new Date(Date.now());

    const current_year = today.getFullYear();
    const next_year = String(Number(current_year) + 1);
    const prior_year = String(Number(current_year) - 1);

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
            <MenuItem value={prior_year}>{prior_year}</MenuItem>
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

const UpdateModal = ({ open, onClose, cur }) => {
  const [year, setYear] = React.useState("");
  const [season, setSeason] = React.useState("");
  const [title, setTitle] = React.useState("");
  const today = new Date(Date.now());
  const current_year = today.getFullYear();
  const next_year = String(Number(current_year) + 1);
  const prior_year = String(Number(current_year) - 1);

  useEffect(() => {
    setYear(cur.semester ? cur.semester.substr(0, 4) : "");
    setSeason(cur.semester ? cur.semester.substr(4) : "");
  }, [cur]);

  const updateLecture = () => {
    if (title === "") {
      alert("강의 이름을 입력하세요!");
      return;
    }
    if (year === "" || season === "") {
      alert("년도 또는 학기를 선택하세요!");
      return;
    }
    const update = {};
    if (cur._id) {
      update.lecture = cur._id;
    }
    if (title) {
      update.title = title;
    }
    if (year && season) {
      update.semester = year + season;
    }
    fetch(BASE_URL + "/api/updateLecture", {
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
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box>
        <Card
          variant="outlined"
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{
            textAlign: "left",
            position: "absolute",
            top: "50%",
            left: "50%",
            minWidth: "500px",
            transform: "translate(-50%, -50%)",
            backfaceVisibility: "hidden",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <IconButton
            style={{ position: "absolute", top: 0, right: 0 }}
            onClick={onClose}
          >
            <Close />
          </IconButton>
          <ListItemText
            primary={cur.title + " (" + cur.semester + ")"}
            secondary={cur.lecturer ? cur.lecturer.name + " 교수님" : ""}
          />
          <hr />
          <CardContent>
            <List>
              <ListItem>
                <InputLabel>강의명 : </InputLabel>
                <TextField
                  defaultValue={cur.title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </ListItem>
              <ListItem>
                &nbsp;
                <Select
                  label="년도"
                  defaultValue={cur.semester ? cur.semester.substr(0, 4) : ""}
                  onChange={(e) => {
                    setYear(e.target.value);
                  }}
                >
                  <MenuItem value={prior_year}>{prior_year}</MenuItem>
                  <MenuItem value={current_year}>{current_year}</MenuItem>
                  <MenuItem value={next_year}>{next_year}</MenuItem>
                </Select>
                <InputLabel>년도</InputLabel>
                &nbsp;&nbsp;
                <Select
                  label="학기"
                  defaultValue={cur.semester ? cur.semester.substr(4) : ""}
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
            </List>
            <br />
            <Button variant="outlined" onClick={updateLecture}>
              수정하기
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};

const LectureList = ({ userType, userId, title, lectureList, isCur }) => {
  const [modal, setModal] = useState(false);
  const [cur, setCur] = useState({});

  const lectures = lectureList.map((item) => {
    let editAndDelete = <></>;

    if (userType === "professor" || userType === "admin") {
      editAndDelete = (
        <>
          <IconButton
            onClick={() => {
              setCur(item);
              setModal(true);
            }}
          >
            <Edit />
          </IconButton>
          <IconButton
            onClick={() => {
              if (window.confirm("정말로 삭제하겠습니까?")) {
                fetch(BASE_URL + "/api/deleteLecture", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "bearer " + localStorage.getItem("token"),
                  },
                  body: JSON.stringify({
                    lecture: item._id,
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
              }
            }}
          >
            <Delete />
          </IconButton>
        </>
      );
    }
    return (
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
        {editAndDelete}
      </ListItem>
    );
  });
  return (
    <>
      <UpdateModal
        open={modal}
        onClose={() => {
          setModal(false);
        }}
        cur={cur}
        userId={userId}
      />
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
    </>
  );
};
export default LectureList;

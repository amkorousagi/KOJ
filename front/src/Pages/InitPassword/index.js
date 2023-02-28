import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormLabel,
  List,
  ListItem,
  ListSubheader,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Search, Upload } from "@mui/icons-material";
import React from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../config.js";

const InitPassword = ({}) => {
  const { lectureId, lectureTitle } = useParams();
  const [name, setName] = React.useState("");
  const [id, setId] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const [selected, setSelected] = React.useState(-1);
  const [password, setPassword] = React.useState("");
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Card variant="outlined" style={{ minWidth: "80vw" }}>
        <br />
        <Typography
          style={{ textAlign: "center", fontWeight: 800, fontSize: "20px" }}
        >
          {lectureTitle} 비밀번호 초기화
        </Typography>
        <CardContent>
          <hr />
          <TextField
            variant="outlined"
            label="사용자 이름"
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
            label="학번(아이디)"
            style={{ width: "100%" }}
            defaultValue={id}
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
          <br />
          <br />
          <Button
            variant="contained"
            style={{ margin: "5px" }}
            onClick={() => {
              const condition = {};
              if (name !== "") {
                condition.name = name;
              }
              if (id !== "") {
                condition.student_id = id;
              }
              fetch(BASE_URL + "/api/readUser", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify(condition),
              })
                .then((res) => {
                  return res.json();
                })
                .then((data) => {
                  console.log(data.data);
                  setUsers(data.data);
                });
            }}
            startIcon={<Search />}
          >
            검색
          </Button>
          <br />
          <br />
          <Paper>
            <List subheader={<ListSubheader>{"검색된 사용자"}</ListSubheader>}>
              {users.map((item, index) => {
                console.log(item);
                return (
                  <ListItem
                    button
                    style={{
                      fontWeight: 800,
                      backgroundColor: index === selected ? "#F0F0F0" : "white",
                      color: index === selected ? "red" : "black",
                    }}
                    onClick={(event) => {
                      setSelected(index);
                    }}
                  >
                    {item.name}({item.id})
                  </ListItem>
                );
              })}
            </List>
          </Paper>
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            variant="outlined"
            fullWidth
            label="새 비밀번호"
            helperText={
              selected === -1
                ? "사용자를 선택하세요"
                : users[selected].name + " 님의 비밀번호를 초기화합니다."
            }
          />
          <br />
          <br />
          <Button
            variant="contained"
            style={{ margin: "5px" }}
            onClick={() => {
              fetch(BASE_URL + "/api/adminUpdateUserPassword", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({
                  id: users[selected].id,
                  password,
                }),
              })
                .then((res) => {
                  return res.json();
                })
                .then((data) => {
                  if (data.success) {
                    console.log(data);
                    window.alert("초기화 성공");
                  } else {
                    alert("초기화 실패");
                    console.log(data);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
            startIcon={<Upload />}
          >
            비밀번호 초기화
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default InitPassword;

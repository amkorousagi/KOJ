import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
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

const Enrollemnt = ({}) => {
  const { lectureId, lectureTitle } = useParams();
  const [name, setName] = React.useState("");
  const [id, setId] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const [checks, setChecks] = React.useState([]);
  console.log(checks);
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Card variant="outlined" style={{ minWidth: "500px" }}>
        <br />
        <Typography
          style={{ textAlign: "center", fontWeight: 800, fontSize: "20px" }}
        >
          {lectureTitle} 학생 등록
        </Typography>
        <CardContent>
          <hr />
          <TextField
            variant="outlined"
            label="학생 이름"
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
            label="학번"
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
                  setChecks(data.data.map((item) => true));
                });
            }}
            startIcon={<Search />}
          >
            검색
          </Button>
          <br />
          <br />
          <Paper>
            <List subheader={<ListSubheader>{"검색된 학생"}</ListSubheader>}>
              {users.map((item, index) => {
                console.log(item);
                return (
                  <ListItem
                    button
                    onClick={(event) => {
                      const n = [...checks];
                      n[index] = !n[index];
                      setChecks(n);
                    }}
                  >
                    <Checkbox checked={checks[index]} />
                    {item.name}
                  </ListItem>
                );
              })}
            </List>
          </Paper>
          <br />
          <br />
          <Button
            variant="contained"
            style={{ margin: "5px" }}
            onClick={() => {
              fetch(BASE_URL + "/api/createEnrollment", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({
                  lecture: lectureId,
                  students: users.reduce((acc, cur, i) => {
                    if (checks[i]) {
                      acc.push(cur._id);
                    }
                    return acc;
                  }, []),
                }),
              })
                .then((res) => {
                  return res.json();
                })
                .then((data) => {
                  console.log(data);
                });
            }}
            startIcon={<Upload />}
          >
            학생 등록
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Enrollemnt;

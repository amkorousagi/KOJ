import * as React from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import { BASE_URL } from "../../config.js";
import { Add, CreateNewFolder, Delete, Upload } from "@mui/icons-material";

const UsersInput = ({ users, setUsers }) => {
  const usersInput = users.map((item, index) => {
    return (
      <TableRow>
        <TableCell>
          <TextField
            value={item.id}
            onChange={(e) => {
              const temp = users.slice();
              temp[index].id = e.target.value;
              setUsers(temp);
            }}
          ></TextField>
        </TableCell>
        <TableCell>
          <TextField
            value={item.password}
            onChange={(e) => {
              const temp = users.slice();
              temp[index].password = e.target.value;
              setUsers(temp);
            }}
          ></TextField>
        </TableCell>
        <TableCell>
          <FormControl>
            <Select
              value={item.user_type}
              onChange={(e) => {
                const temp = users.slice();
                temp[index].user_type = e.target.value;
                setUsers(temp);
              }}
            >
              <MenuItem value="student">학생</MenuItem>
              <MenuItem value="tutor">튜터</MenuItem>
              <MenuItem value="professor">교수</MenuItem>
            </Select>
          </FormControl>
        </TableCell>
        <TableCell>
          <TextField
            value={item.name}
            onChange={(e) => {
              const temp = users.slice();
              temp[index].name = e.target.value;
              setUsers(temp);
            }}
          ></TextField>
        </TableCell>
        <TableCell>
          <IconButton
            onClick={() => {
              const front = users.slice(0, index);
              const end = users.slice(index + 1);
              console.log(front);
              console.log(end);
              console.log(front.concat(end));
              const result = front.concat(end);
              console.log(result);
              setUsers(result);
            }}
          >
            <Delete />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  });
  return <>{usersInput}</>;
};

const CreateUser = () => {
  const [users, setUsers] = React.useState([
    { id: "", password: "", user_type: "student", name: "" },
  ]);

  const onCreateUsers = (e) => {
    fetch(BASE_URL + "/api/createUsers", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ users }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.success) {
          alert("회원 생성 완료!");
        } else {
          alert("회원 생성 실패..");
          console.log(data.error);
        }
      })
      .catch((err) => {
        alert("회원 생성 실패..");
        console.log(err);
      });
  };
  console.log(users);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{ textAlign: "center" }}
    >
      <Card variant="outlined">
        <CardContent>
          <Typography
            style={{ fontFamily: "Nanum Gothic", textAlign: "center" }}
          >
            회원 생성
          </Typography>
          <hr />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              endIcon={<Upload />}
              onClick={onCreateUsers}
            >
              회원 생성
            </Button>
            <Button variant="outlined" endIcon={<CreateNewFolder />}>
              엑셀로 추가
            </Button>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>아이디</TableCell>
                <TableCell>비밀번호</TableCell>
                <TableCell>회원유형</TableCell>
                <TableCell>이름</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <UsersInput users={users} setUsers={setUsers} />
            </TableBody>
          </Table>
          <br />
          <Button
            variant="outlined"
            endIcon={<Add />}
            onClick={() => {
              setUsers([
                ...users,
                { id: "", password: "", user_type: "student", name: "" },
              ]);
            }}
          >
            회원 추가
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};
export default CreateUser;

import * as React from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import { BASE_URL } from "../../config.js";

const Login = () => {
  const [id, setId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorText, setErrorText] = React.useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    fetch(BASE_URL + "/api/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.success) {
          localStorage.setItem("token", data.data.token);
          //localStorage.setItem("id", id);
          //localStorage.setItem("password", password);
          window.open("/lectures", "_self");
        } else {
          //localStorage.setItem("isLogined", "false");
          setErrorText(data.error);
        }
      })
      .catch((err) => {
        console.log(err);
        //localStorage.setItem("isLogined", "false");
      });
  };

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
            style={{
              fontFamily: "Nanum Gothic",
              textAlign: "center",
              fontWeight: 800,
              fontSize: 20,
            }}
          >
            로그인
          </Typography>
          <hr />

          <form onSubmit={onLogin} autoComplete="on">
            <input
              name="id"
              type="text"
              placeholder="아이디"
              onChange={(e) => setId(e.target.value)}
              value={id}
              autoComplete="username"
              autoFocus
            />
            <br />
            <input
              name="pw"
              type="password"
              placeholder="비밀번호"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoComplete="current-password"
            />
            <br />
            <br />
            <Button type="submit" variant="contained" color="primary">
              로그인
            </Button>
          </form>
          <hr />
          <Typography>
            아이디는 당신의{" "}
            <div style={{ fontWeight: 700, display: "inline" }}>학번</div>
            입니다.
          </Typography>

          <br />
          <Typography>
            비밀번호를 잊어버렸나요?
            <br />
            관리자
            <Typography style={{ fontWeight: 800, display: "inline" }}>
              (mikeds0222@gmail.com)
            </Typography>
            에게 문의하세요.
          </Typography>
          <Typography style={{ color: "red", fontWeight: 800 }}>
            {errorText}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
export default Login;

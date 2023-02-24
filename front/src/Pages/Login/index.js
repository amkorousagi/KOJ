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
  const [id, setId] = React.useState(localStorage.getItem("id"));
  const [password, setPassword] = React.useState(
    localStorage.getItem("password")
  );
  const [errorText, setErrorText] = React.useState("");

  const onLogin = (e) => {
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
          localStorage.setItem("id", id);
          localStorage.setItem("password", password);
          localStorage.setItem("user_type", data.data.user_type);
          localStorage.setItem("isLogined", "true");
          window.location.reload();
        } else {
          localStorage.setItem("isLogined", "false");
          setErrorText(data.error);
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.setItem("isLogined", "false");
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

          <form>
            <TextField
              id="id"
              label="아이디"
              onChange={(e) => setId(e.target.value)}
              defaultValue={id}
            />
            <br />
            <TextField
              id="password"
              type="password"
              label="비밀번호"
              onChange={(e) => setPassword(e.target.value)}
              defaultValue={password}
            />
          </form>
          <br />
          <Button variant="contained" color="primary" onClick={onLogin}>
            로그인
          </Button>
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
              (hasmi5452@gmail)
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

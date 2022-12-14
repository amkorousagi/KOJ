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
  const [userType, setUserType] = React.useState(
    localStorage.getItem("user_type")
  );

  const [id, setId] = React.useState(localStorage.getItem("id"));
  const [password, setPassword] = React.useState(
    localStorage.getItem("password")
  );
  const [errorText, setErrorText] = React.useState("");
  const handlingRadio = (e) => {
    e.preventDefault();
    setUserType(e.target.value);
  };

  const onLogin = (e) => {
    fetch(BASE_URL + "/api/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        password,
        user_type: userType,
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
          localStorage.setItem("user_type", userType);
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
            style={{ fontFamily: "Nanum Gothic", textAlign: "center" }}
          >
            로그인
          </Typography>
          <hr />
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="position"
              id="userTypeRadio"
              name="userType"
              defaultValue={localStorage.getItem("user_type") ?? "student"}
              onChange={handlingRadio}
            >
              <FormLabel
                component="legend"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                회원 유형&nbsp;&nbsp;
              </FormLabel>
              <FormControlLabel
                value="student"
                control={<Radio color="primary" />}
                label="학생"
                labelPlacement="end"
              />

              <FormControlLabel
                value="tutor"
                control={<Radio color="primary" />}
                label="튜터"
                labelPlacement="end"
              />

              <FormControlLabel
                value="professor"
                control={<Radio color="primary" />}
                label="교수"
                labelPlacement="end"
              />
              <FormControlLabel
                value="admin"
                control={<Radio color="primary" />}
                label="관리자"
                labelPlacement="end"
              />
            </RadioGroup>
          </FormControl>
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

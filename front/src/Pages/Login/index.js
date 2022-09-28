import * as React from "react";
import { styled } from "@mui/system";

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
import { useRecoilState } from "recoil";
import { isLoginedState, userTypeState } from "../../atoms.js";

const Login = () => {
  const [isLogined, setIsLogined] = useRecoilState(isLoginedState);
  const [userType, setUserType] = useRecoilState(userTypeState);

  let tempUserType = "student";

  const handlingRadio = (e) => {
    e.preventDefault();
    tempUserType = e.target.value;
  };

  const onLogin = (e) => {
    localStorage.setItem("isLogined", "true");
    localStorage.setItem("userType", tempUserType);
    setUserType(tempUserType);
    setIsLogined(true);
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
              defaultValue="student"
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
            </RadioGroup>
          </FormControl>
          <form>
            <TextField id="id" label="아이디" />
            <br />
            <TextField id="password" type="password" label="비밀번호" />
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
        </CardContent>
      </Card>
    </Box>
  );
};
export default Login;

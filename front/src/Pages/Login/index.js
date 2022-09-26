import * as React from "react";
import { styled } from "@mui/system";

import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  createTheme,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { atom, useRecoilState } from "recoil";

const Login = () => {
  const autoLoginState = atom({
    key: "autoLogin",
    default: false,
  });
  const [autoLogin, setAutoLogin] = useRecoilState(autoLoginState);
  const onAutoLogin = (event) => {
    setAutoLogin(!autoLogin);
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
              name="userType"
              defaultValue="student"
            >
              <FormLabel
                component="legend"
                style={{
                  display: "flex",
                  fontFamily: "Nanum Gothic",
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                회원 유형&nbsp;&nbsp;
              </FormLabel>
              <FormControlLabel
                style={{
                  fontFamily: "Nanum Gothic",
                  textAlign: "center",
                }}
                value="student"
                control={<Radio color="primary" />}
                label="학생"
                labelPlacement="end"
              />

              <FormControlLabel
                style={{ fontFamily: "Nanum Gothic", textAlign: "center" }}
                value="tutor"
                control={<Radio color="primary" />}
                label="튜터"
                labelPlacement="end"
              />

              <FormControlLabel
                style={{ fontFamily: "Nanum Gothic", textAlign: "center" }}
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
          <FormControlLabel
            control={
              <Checkbox
                checked={autoLogin}
                onChange={onAutoLogin}
                name="autoLogin"
              />
            }
            label="자동 로그인"
          />
          <Button variant="contained" color="primary">
            로그인
          </Button>
          <hr />
          <Typography>
            아직 회원이 아닌가요?
            <a href="/join">
              <Typography style={{ fontWeight: 800 }}>회원가입</Typography>
            </a>
          </Typography>

          <br />
          <Typography>
            아이디나 비밀번호를 잊어버렸나요?
            <a href="/forget">
              <Typography style={{ fontWeight: 800 }}>
                아이디/비밀번호찾기
              </Typography>
            </a>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
export default Login;

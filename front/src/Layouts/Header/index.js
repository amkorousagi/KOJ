import { Button, Grid, Typography } from "@material-ui/core";
import { Box } from "@mui/system";
import React from "react";
import { useRecoilState } from "recoil";
import { isLoginedState, userTypeState } from "../../atoms.js";

const Profile = ({ isLogined }) => {
  const [userType, setUserType] = useRecoilState(userTypeState);
  const localUserType = localStorage.getItem("userType");

  let title;
  if (userType === "student") {
    title = "학생";
  } else if (userType === "tutor") {
    title = "튜터";
  } else if (userType === "professor") {
    title = "교수";
  } else {
    title = "기타";
  }

  if (localUserType) {
    setUserType(localUserType);
  }
  if (isLogined) {
    return (
      <div>
        {title}
        <br />
        <br />
        <a href="/profile" style={{ fontWeight: 800 }}>
          박세찬
        </a>{" "}
        님
      </div>
    );
  } else {
    return <div></div>;
  }
};

const LoginContol = ({ isLogined, setIsLogined }) => {
  const logout = (e) => {
    localStorage.setItem("isLogined", "false");
    setIsLogined(false);
  };

  if (isLogined === true) {
    return (
      <Button onClick={logout}>
        <Typography
          style={{
            fontFamily: "Nanum Gothic",
            fontWeight: 800,
            fontSize: "20px",
            display: "inline",
          }}
        >
          로그아웃
        </Typography>
      </Button>
    );
  } else {
    return (
      <a href="/" style={{ display: "inline" }}>
        <Typography
          style={{
            fontFamily: "Nanum Gothic",
            fontWeight: 800,
            fontSize: "20px",
            display: "inline",
          }}
        >
          로그인
        </Typography>
      </a>
    );
  }
};

const Home = () => {
  const [isLogined, setIsLogined] = useRecoilState(isLoginedState);
  return (
    <div>
      <Grid container spacing={2} justifyContent="flex-end" alignItems="center">
        <Grid item xs={2}>
          <a href="/">
            <img src="KOJ.png" height="100" width="200" alt="kog logo" />
          </a>
        </Grid>
        <Grid item xs={3} style={{ textAlign: "center" }}>
          <Box justifyContent="flex-end">
            <a href="/">
              <Typography
                style={{
                  fontFamily: "Nanum Gothic",
                  fontWeight: 800,
                  fontSize: "20px",
                }}
              >
                강의목록
              </Typography>
            </a>
          </Box>
        </Grid>
        <Grid item xs={3} style={{ textAlign: "center" }}>
          <Box justifyContent="flex-end">
            <a href="/">
              <Typography
                style={{
                  fontFamily: "Nanum Gothic",
                  fontWeight: 800,
                  fontSize: "20px",
                }}
              >
                최근 채점
              </Typography>
            </a>
          </Box>
        </Grid>
        <Grid item xs={2} style={{ textAlign: "center" }}>
          <LoginContol isLogined={isLogined} setIsLogined={setIsLogined} />
        </Grid>
        <Grid item xs={2} style={{ textAlign: "center" }}>
          <Profile isLogined={isLogined} />
        </Grid>
      </Grid>
      <hr />
    </div>
  );
};
export default Home;

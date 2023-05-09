import { Button, Grid, Typography } from "@material-ui/core";
import { Box } from "@mui/system";
import React, { useState } from "react";
import UpdateUserPassword from "../../Components/UpdateUserPassword.js";

const Profile = ({
  name,
  userType,
  isLogined,
  setIsLogined,
  setOpenUpdateUserPassword,
}) => {
  const logout = (e) => {
    setIsLogined(false);
    localStorage.removeItem("token");
    window.open("/", "_self");
  };

  let title;
  if (userType === "student") {
    title = "학생";
  } else if (userType === "tutor") {
    title = "튜터";
  } else if (userType === "professor") {
    title = "교수";
  } else if (userType === "admin") {
    title = "관리자";
  } else {
    title = "기타";
  }

  if (isLogined === true) {
    return (
      <div>
        <br />
        {title + " "}
        <a href="/profile" style={{ fontWeight: 800 }}>
          {name}
        </a>{" "}
        님
        <br />
        <br />
        <Button variant="outlined" onClick={logout}>
          <Typography
            style={{
              fontFamily: "Nanum Gothic",
              fontWeight: 800,
              display: "inline",
            }}
          >
            로그아웃
          </Typography>
        </Button>
        <br />
        <br />
        <Button
          variant="outlined"
          onClick={() => {
            setOpenUpdateUserPassword(true);
            //logout();
          }}
        >
          <Typography
            style={{
              fontFamily: "Nanum Gothic",
              fontWeight: 800,
              display: "inline",
            }}
          >
            비밀번호 변경
          </Typography>
        </Button>
      </div>
    );
  } else {
    return <div></div>;
  }
};

const Logo = () => {
  return (
    <a href="/">
      <img src="/KOJ.png" height="100" width="200" alt="kog logo" />
    </a>
  );
};

const Menu1 = ({ isLogined, userType }) => {
  if (isLogined !== true) {
    return (
      <Box justifyContent="flex-end">
        <a href="/about">
          <Typography
            style={{
              fontFamily: "Nanum Gothic",
              fontWeight: 800,
              fontSize: "20px",
            }}
          >
            KOJ 소개
          </Typography>
        </a>
      </Box>
    );
  } else {
    if (userType === "student") {
      return (
        <Box justifyContent="flex-end">
          <a href="/lectures">
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
      );
    } else if (userType === "tutor") {
      return (
        <Box justifyContent="flex-end">
          <a href="/lectures">
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
      );
    } else if (userType === "professor") {
      return (
        <Box justifyContent="flex-end">
          <a href="/lectures">
            <Typography
              style={{
                fontFamily: "Nanum Gothic",
                fontWeight: 800,
                fontSize: "20px",
              }}
            >
              실습 관리
            </Typography>
          </a>
        </Box>
      );
    } else if (userType === "admin") {
      return (
        <Box justifyContent="flex-end">
          <a href="/createUser">
            <Typography
              style={{
                fontFamily: "Nanum Gothic",
                fontWeight: 800,
                fontSize: "20px",
              }}
            >
              회원 관리
            </Typography>
          </a>
        </Box>
      );
    }
  }
};

const Menu2 = ({ isLogined, userType }) => {
  if (isLogined !== true) {
    return (
      <Box justifyContent="flex-end">
        <a href="/lab">
          <Typography
            style={{
              fontFamily: "Nanum Gothic",
              fontWeight: 800,
              fontSize: "20px",
            }}
          >
            연구실 소개
          </Typography>
        </a>
      </Box>
    );
  } else {
    if (userType === "student") {
      return (
        <Box justifyContent="flex-end">
          <a href="/scores">
            <Typography
              style={{
                fontFamily: "Nanum Gothic",
                fontWeight: 800,
                fontSize: "20px",
              }}
            >
              채점 기록
            </Typography>
          </a>
        </Box>
      );
    } else if (userType === "tutor") {
      return (
        <Box justifyContent="flex-end">
          <a href="/judge">
            <Typography
              style={{
                fontFamily: "Nanum Gothic",
                fontWeight: 800,
                fontSize: "20px",
              }}
            >
              채점 기록
            </Typography>
          </a>
        </Box>
      );
    } else if (userType === "professor") {
      return (
        <Box justifyContent="flex-end">
          <a href="/dashscores">
            <Typography
              style={{
                fontFamily: "Nanum Gothic",
                fontWeight: 800,
                fontSize: "20px",
              }}
            >
              성적 관리
            </Typography>
          </a>
        </Box>
      );
    } else if (userType === "admin") {
      return (
        <Box justifyContent="flex-end">
          <a href="/initpassword">
            <Typography
              style={{
                fontFamily: "Nanum Gothic",
                fontWeight: 800,
                fontSize: "20px",
              }}
            >
              비번 초기화
            </Typography>
          </a>
        </Box>
      );
    }
  }
};

const Menu3 = ({ isLogined, userType }) => {
  if (isLogined !== true) {
    return (
      <Box justifyContent="flex-end">
        <a href="/">
          <Typography
            style={{
              fontFamily: "Nanum Gothic",
              fontWeight: 800,
              fontSize: "20px",
            }}
          >
            로그인
          </Typography>
        </a>
      </Box>
    );
  } else {
    if (userType === "student") {
      return (
        <Box justifyContent="flex-end">
          <a href="/materials">
            <Typography
              style={{
                fontFamily: "Nanum Gothic",
                fontWeight: 800,
                fontSize: "20px",
              }}
            >
              강의 자료
            </Typography>
          </a>
        </Box>
      );
    } else if (userType === "tutor") {
      return (
        <Box justifyContent="flex-end">
          <a href="/materials">
            <Typography
              style={{
                fontFamily: "Nanum Gothic",
                fontWeight: 800,
                fontSize: "20px",
              }}
            >
              강의 자료
            </Typography>
          </a>
        </Box>
      );
    } else if (userType === "professor") {
      return (
        <Box justifyContent="flex-end">
          <a href="/materials">
            <Typography
              style={{
                fontFamily: "Nanum Gothic",
                fontWeight: 800,
                fontSize: "20px",
              }}
            >
              강의 자료
            </Typography>
          </a>
        </Box>
      );
    } else if (userType === "admin") {
      return (
        <Box justifyContent="flex-end">
          <a href="/data">
            <Typography
              style={{
                fontFamily: "Nanum Gothic",
                fontWeight: 800,
                fontSize: "20px",
              }}
            >
              연구 활용
            </Typography>
          </a>
        </Box>
      );
    }
  }
};

const Header = ({ userType, name, isLogined, setIsLogined }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <UpdateUserPassword
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
      />
      <div
        className="header"
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          backgroundColor: "white",
          zIndex: 10,
        }}
      >
        <Grid
          container
          spacing={2}
          justifyContent="flex-end"
          alignItems="center"
        >
          <Grid item xs={2}>
            <Logo />
          </Grid>
          <Grid item xs={3} style={{ textAlign: "center" }}>
            <Menu1 isLogined={isLogined} userType={userType} />
          </Grid>
          <Grid item xs={3} style={{ textAlign: "center" }}>
            <Menu2 isLogined={isLogined} userType={userType} />
          </Grid>
          <Grid item xs={2} style={{ textAlign: "center" }}>
            <Menu3 isLogined={isLogined} userType={userType} />
          </Grid>
          <Grid item xs={2} style={{ textAlign: "center" }}>
            <Profile
              name={name}
              userType={userType}
              isLogined={isLogined}
              setIsLogined={setIsLogined}
              setOpenUpdateUserPassword={setOpen}
            />
          </Grid>
        </Grid>
        <hr />
      </div>
      <div
        style={{
          height: 160,
          width: "100%",
        }}
      ></div>
    </>
  );
};

export default Header;

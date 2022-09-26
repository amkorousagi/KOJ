import { Grid, Typography } from "@material-ui/core";
import { Box } from "@mui/system";
import React from "react";

const Home = () => {
  return (
    <div>
      <Grid container spacing={2} justifyContent="flex-end" alignItems="center">
        <Grid item xs={2}>
          <a href="/">
            <img src="KOJ.png" height="100" width="200" alt="kog logo" />
          </a>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "center" }}>
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
        <Grid item xs={2}></Grid>
        <Grid item xs={4} style={{ textAlign: "center" }}>
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
        </Grid>
      </Grid>
      <hr />
    </div>
  );
};
export default Home;

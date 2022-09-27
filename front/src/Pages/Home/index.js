import { Card, Typography, Box, CardContent } from "@material-ui/core";
import React from "react";

const Home = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{ textAlign: "left" }}
    >
      <Card variant="outlined">
        <CardContent>
          <Typography style={{ fontFamily: "Nanum Gothic" }}>
            <div style={{ textAlign: "center" }}>im home</div>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
export default Home;

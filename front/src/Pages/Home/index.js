import * as React from "react";
import { styled } from "@mui/system";

import {
  Container,
  createTheme,
  Grid,
  Paper,
  ThemeProvider,
  Typography,
} from "@material-ui/core";

const mtheme = createTheme({
  palette: {
    mode: "dark",
    text: {
      secondary: "#edf2ff",
    },
  },
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Home = () => {
  return (
    <ThemeProvider theme={mtheme}>
      <Typography style={{ fontFamily: "Nanum Gothic" }}>나눔</Typography>
      <Typography style={{ fontFamily: "Nanum Gothic", fontWeight: "bold" }}>
        나눔 bold
      </Typography>
      <Typography style={{ fontFamily: "Nanum Gothic", fontWeight: 800 }}>
        나눔 800
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Item theme={mtheme}>
            <Typography style={{ fontFamily: "Nanum Gothic", fontWeight: 800 }}>
              나눔
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item theme={mtheme}>나눔2</Item>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default Home;

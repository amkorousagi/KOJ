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
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Item theme={mtheme}>
            <Typography style={{}}>나눔</Typography>
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item theme={mtheme}>ds</Item>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default Home;

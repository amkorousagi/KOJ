import {
  Card,
  Typography,
  Box,
  CardContent,
  CardHeader,
  Button,
  Paper,
  MenuList,
  ListSubheader,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Grid,
} from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const Lecture = () => {
  const { lectureId } = useParams();
  const [open, setOpen] = React.useState([false, false]);
  const handleClick = (i) => {
    const o = { ...open };
    o[i] = !o[i];
    setOpen(o);
  };
  console.log(lectureId);
  return (
    <Grid container>
      <Grid item xs={1}>
        <div
          style={{
            display: "flex",
            overflow: "auto",
            width: 300,
            backgroundColor: "#F0F0F0",
          }}
        >
          <List
            subheader={<ListSubheader>실습</ListSubheader>}
            style={{
              width: "100%",
            }}
          >
            <ListItem button onClick={() => handleClick(0)}>
              <ListItemText primary="실습 1" />
              {open[0] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open[0]} timeout="auto" unmountOnExit>
              <List
                disablePadding
                subheader={
                  <ListSubheader>&nbsp;&nbsp;&nbsp;&nbsp;문제</ListSubheader>
                }
              >
                <ListItem button>
                  <ListItemText primary="&nbsp;&nbsp;&nbsp;&nbsp;문제 1" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="&nbsp;&nbsp;&nbsp;&nbsp;문제 2" />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button onClick={() => handleClick(1)}>
              <ListItemText primary="실습 2" />
              {open[1] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open[1]} timeout="auto" unmountOnExit>
              <List
                disablePadding
                subheader={
                  <ListSubheader>&nbsp;&nbsp;&nbsp;&nbsp;문제</ListSubheader>
                }
              >
                <ListItem button>
                  <ListItemText primary="&nbsp;&nbsp;&nbsp;&nbsp;문제 1" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="&nbsp;&nbsp;&nbsp;&nbsp;문제 2" />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </div>
      </Grid>
      <Grid item xs={11}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ textAlign: "left" }}
        >
          <Card variant="outlined">
            <CardContent>
              <Typography style={{ fontFamily: "Nanum Gothic" }}>
                <div style={{ textAlign: "center" }}>연구실 소개</div>
                <hr />
                <br />
                연구실 명 : 임베디드소프트웨어공학 연구실 (이우진 교수님)
                <br />
                연구실 관심분야 : SW testing, data science, game AI
                <br />
                오시는 길 : 경북대학교 IT-5호관 523호
                <br />
                문의용 이메일 : hasmi5452@gmail.com
                <br />
                전화 : 053-950-6378
                <br />
                연구실 홈페이지 :{" "}
                <a
                  href="http://selab.knu.ac.kr/dokuwiki/doku.php"
                  style={{ fontFamily: "Nanum Gothic", fontWeight: 800 }}
                >
                  selab
                </a>
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Grid>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </Grid>
  );
};
export default Lecture;

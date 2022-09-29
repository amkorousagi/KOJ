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
  ImageList,
  ImageListItem,
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
  const practiceData = [
    {
      practiceName: "실습 1",
      practiceId: 1,
      problemList: [
        { problemName: "문제 1", problemId: 1 },
        { problemName: "문제 2", problemId: 2 },
        { problemName: "문제 3", problemId: 3 },
      ],
    },
    {
      practiceName: "실습 2",
      practiceId: 2,
      problemList: [
        { problemName: "문제 1", problemId: 4 },
        { problemName: "문제 2", problemId: 5 },
      ],
    },
  ];
  const practices = practiceData.map((item, index) => {
    const probelms = item.problemList.map((item) => {
      return (
        <ListItem button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <ListItemText primary={item.problemName} />
        </ListItem>
      );
    });

    return (
      <>
        <ListItem button onClick={() => handleClick(index)}>
          <ListItemText primary={item.practiceName} />
          {open[index] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open[index]} timeout="auto" unmountOnExit>
          <List
            disablePadding
            subheader={
              <ListSubheader>&nbsp;&nbsp;&nbsp;&nbsp;문제</ListSubheader>
            }
          >
            {probelms}
          </List>
        </Collapse>
      </>
    );
  });

  console.log(lectureId);
  return (
    <>
      <Grid container>
        <Grid item xs={2} style={{ zIndex: 5 }}>
          <div
            style={{
              display: "flex",
              overflow: "auto",
              width: "100%",
              backgroundColor: "#F0F0F0",
            }}
          >
            <List
              subheader={<ListSubheader>실습</ListSubheader>}
              style={{
                width: "100%",
              }}
            >
              {practices}
            </List>
          </div>
        </Grid>
        <Grid item xs={10}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{ margin: 5 }}
          >
            <Grid item xs={6} style={{ marginBottom: 15 }}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                style={{ textAlign: "center", fontWeight: 700 }}
              >
                <Card variant="outlined">
                  <CardHeader
                    style={{ fontSize: 20 }}
                    title="문제 점수 | 0/10"
                  ></CardHeader>
                </Card>
                &nbsp;&nbsp;
                <Card variant="outlined">
                  <CardContent>남은 시간 | 10:00</CardContent>
                </Card>
              </Box>
            </Grid>
            <Grid item xs={6} style={{ marginBottom: 15 }}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                style={{ textAlign: "center", fontWeight: 700 }}
              >
                <Card variant="outlined">
                  <CardContent>제출 이력</CardContent>
                </Card>
                &nbsp;&nbsp;
                <Card variant="outlined">
                  <CardContent>정답 제출</CardContent>
                </Card>
              </Box>
            </Grid>
            <br />
            <Grid item xs={12}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                style={{ textAlign: "left" }}
              >
                <Card variant="outlined">
                  <CardContent>
                    <Typography style={{ fontFamily: "Nanum Gothic" }}>
                      <div style={{ textAlign: "center", fontWeight: 700 }}>
                        문제 설명
                      </div>
                      <hr />
                    </Typography>
                    <img src="/problem1.png" alt="problem" />
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default Lecture;

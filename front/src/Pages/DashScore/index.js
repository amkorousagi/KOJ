import {
  Card,
  Typography,
  Box,
  CardContent,
  Button,
  ListSubheader,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Add,
  DisabledByDefault,
  ExpandLess,
  ExpandMore,
  LeakAddOutlined,
} from "@mui/icons-material";
import { BASE_URL, FILE_URL } from "../../config.js";

const Dash = ({ scores }) => {
  console.log(scores);
  if (Object.keys(scores).length !== 0) {
    if (scores.meta.practices) {
      let total = 0;
      const head = scores.meta.practices.map((item) => {
        return (
          <TableCell>
            {item.title}(
            {scores.meta.problems.reduce((acc, current) => {
              if (current.practice === item._id) {
                total += current.score;
                return acc + current.score;
              } else {
                return acc;
              }
            }, 0)}
            )
          </TableCell>
        );
      });
      return (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>이름</TableCell>
              <TableCell>총점({total})</TableCell>
              {head}
            </TableRow>
          </TableHead>
          <TableBody>
            {scores.dashscore.map((item) => {
              let s_total = 0;
              const r = scores.meta.practices.map((p) => {
                if (item[p._id]) {
                  s_total += item[p._id];
                  return <TableCell>{item[p._id]}</TableCell>;
                } else {
                  return <TableCell>{0}</TableCell>;
                }
              });
              return (
                <TableRow>
                  <TableCell>
                    {scores.meta.students.reduce((acc, cur) => {
                      if (cur._id === item.student) {
                        return cur.name;
                      } else {
                        return acc + "";
                      }
                    }, "")}
                  </TableCell>
                  <TableCell>{s_total}</TableCell>
                  {r}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      );
    } else {
      let total = 0;
      const head = scores.meta.problems.map((item) => {
        total += item.score;
        return (
          <TableCell>
            {item.title}({item.score})
          </TableCell>
        );
      });
      return (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>이름</TableCell>
              <TableCell>총점({total})</TableCell>
              {head}
            </TableRow>
          </TableHead>
          <TableBody>
            {scores.dashscore.map((item) => {
              let s_total = 0;
              const r = scores.meta.problems.map((p) => {
                if (item[p._id]) {
                  s_total += item[p._id];
                  return <TableCell>{item[p._id]}</TableCell>;
                } else {
                  return <TableCell>{0}</TableCell>;
                }
              });
              return (
                <TableRow>
                  <TableCell>
                    {scores.meta.students.reduce((acc, cur) => {
                      if (cur._id === item.student) {
                        return cur.name;
                      } else {
                        return acc + "";
                      }
                    }, "")}
                  </TableCell>
                  <TableCell>{s_total}</TableCell>
                  {r}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      );
    }
  } else {
    return <></>;
  }
};

const DashScore = ({ userId, userType }) => {
  const { lectureId, lectureTitle } = useParams();
  const [practiceData, setPracticeData] = React.useState([]);
  const [curPracTitle, setCurPracTitle] = React.useState(lectureTitle);
  const [scores, setScores] = React.useState({});
  // lecutre 없는 practice 만들어짐
  // 제대로 read하는지 확인
  useEffect(() => {
    fetch(BASE_URL + "/api/readPractice", {
      method: "POST",
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lecture: lectureId,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        //console.log(data);
        setPracticeData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(BASE_URL + "/api/readDashScore", {
      method: "POST",
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lecture: lectureId,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        console.log(JSON.stringify(data.data));
        setScores(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const practices = practiceData.map((item) => {
    //console.log(item);

    return (
      <ListItem
        button
        onClick={() => {
          setCurPracTitle(item.title);
          fetch(BASE_URL + "/api/readDashScore", {
            method: "POST",
            headers: {
              Authorization: "bearer " + localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              lecture: lectureId,
              practice: item._id,
            }),
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              console.log(data);
              console.log(JSON.stringify(data.data));
              setScores(data.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        <ListItemText primary={item.title} />
      </ListItem>
    );
  });

  return (
    <>
      <Grid container>
        <Grid item xs={3} style={{ zIndex: 5 }}>
          <div
            style={{
              display: "flex",
              overflow: "auto",
              width: "100%",
              backgroundColor: "#F0F0F0",
            }}
          >
            <List
              subheader={<ListSubheader>{lectureTitle}</ListSubheader>}
              style={{
                width: "100%",
              }}
            >
              <ListItem
                button
                onClick={() => {
                  setCurPracTitle(lectureTitle);
                  fetch(BASE_URL + "/api/readDashScore", {
                    method: "POST",
                    headers: {
                      Authorization: "bearer " + localStorage.getItem("token"),
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      lecture: lectureId,
                    }),
                  })
                    .then((res) => {
                      return res.json();
                    })
                    .then((data) => {
                      console.log(data);
                      setScores(data.data);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                <ListItemText primary={"전체보기"} />
              </ListItem>
              {practices}
              <hr />
              <ListItem
                button
                onClick={() => {
                  window.open(
                    "/enrollment/" + lectureId + "/" + lectureTitle,
                    "_blank",
                    "hegith=200,width=200"
                  );
                }}
              >
                <Add /> &nbsp; 학생 등록
              </ListItem>
            </List>
          </div>
        </Grid>
        <Grid item xs={9}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{ margin: 5 }}
          >
            <Grid item xs={12}>
              <Box
                justifyContent="center"
                alignItems="center"
                style={{ textAlign: "left", margin: "5px" }}
              >
                <Card variant="outlined">
                  <CardContent>
                    <Typography style={{ fontFamily: "Nanum Gothic" }}>
                      <div style={{ textAlign: "center", fontWeight: 700 }}>
                        {curPracTitle}
                      </div>
                      <hr />
                    </Typography>
                    <Dash scores={scores} />
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
export default DashScore;

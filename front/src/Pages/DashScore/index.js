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
  Paper,
  TableContainer,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Add,
  Close,
  DisabledByDefault,
  DoDisturb,
  ExpandLess,
  ExpandMore,
  LeakAddOutlined,
  PanoramaFishEye,
} from "@mui/icons-material";
import { BASE_URL, FILE_URL } from "../../config.js";
import { maxWidth } from "@mui/system";

const Dash = ({ scores, requestPractice }) => {
  console.log(scores);
  // code, 결과, 재채점
  if (Object.keys(scores).length !== 0) {
    if (scores.meta.practices) {
      let total = 0;
      const head = scores.meta.practices.map((item) => {
        return (
          <TableCell
            style={{
              position: "sticky",
              top: 0,
              backgroundColor: "#F0F0F0",
              zIndex: 10,
            }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                requestPractice(item);
              }}
            >
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
            </Button>
          </TableCell>
        );
      });
      return (
        <TableContainer style={{ maxHeight: "80vh" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    position: "sticky",
                    top: 0,
                    left: 0,
                    backgroundColor: "#F0F0F0",
                    zIndex: 11,
                  }}
                >
                  이름
                </TableCell>
                <TableCell
                  style={{
                    position: "sticky",
                    top: 0,
                    left: 45,
                    backgroundColor: "#F0F0F0",
                    zIndex: 11,
                  }}
                >
                  총점({total})
                </TableCell>
                {head}
              </TableRow>
            </TableHead>
            <TableBody style={{}}>
              {scores.dashscore.map((item) => {
                let s_total = 0;

                const r = scores.meta.practices.map((p) => {
                  let icon = <></>;
                  const sub_total = scores.meta.problems.reduce(
                    (acc, current) => {
                      if (current.practice === p._id) {
                        total += current.score;
                        return acc + current.score;
                      } else {
                        return acc;
                      }
                    },
                    0
                  );
                  console.log(p);
                  if (item[p._id] < sub_total) {
                    icon = <DoDisturb />;
                  } else {
                    icon = <PanoramaFishEye />;
                  }

                  if (item[p._id]) {
                    s_total += item[p._id];
                    return (
                      <TableCell>
                        {icon}({item[p._id]})
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell>
                        <Close />({0})
                      </TableCell>
                    );
                  }
                });
                return (
                  <TableRow>
                    <TableCell
                      style={{
                        position: "sticky",
                        background: "white",
                        left: 0,
                        zIndex: 10,
                      }}
                    >
                      {scores.meta.students.reduce((acc, cur) => {
                        if (cur._id === item.student) {
                          return cur.name;
                        } else {
                          return acc + "";
                        }
                      }, "")}
                    </TableCell>
                    <TableCell
                      style={{
                        position: "sticky",
                        background: "white",
                        left: 45,
                        zIndex: 10,
                      }}
                    >
                      {s_total}
                    </TableCell>
                    {r}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      );
    } else {
      let total = 0;
      const head = scores.meta.problems.map((item) => {
        total += item.score;
        return (
          <TableCell
            style={{
              position: "sticky",
              top: 0,
              backgroundColor: "#F0F0F0",
              zIndex: 10,
            }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                if (
                  window.confirm(
                    item.title +
                      "문제를 재채점 하시겠습니까.(문제를 푼 모든 학생을 재채점 합니다.)"
                  )
                ) {
                  fetch(BASE_URL + "/api/resubmission", {
                    method: "POST",
                    headers: {
                      Authorization: "bearer " + localStorage.getItem("token"),
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      submissions: scores.dashscore.map((it) => {
                        let result = undefined;
                        if (it.submission !== undefined) {
                          it.submission.map((i) => {
                            if (i !== undefined) {
                              if (i.problem === item._id) {
                                result = i.submission;
                              }
                            }
                            return;
                          });
                        }
                        return result;
                      }),
                    }),
                  })
                    .then((res) => {
                      return res.json();
                    })
                    .then((data) => {
                      console.log(data);
                      alert("재채점이 완료되었습니다.");
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
              }}
            >
              {item.title}({item.score})
            </Button>
          </TableCell>
        );
      });
      return (
        <TableContainer style={{ maxHeight: "80vh" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    position: "sticky",
                    top: 0,
                    left: 0,
                    backgroundColor: "#F0F0F0",
                    zIndex: 11,
                  }}
                >
                  이름
                </TableCell>
                <TableCell
                  style={{
                    position: "sticky",
                    top: 0,
                    left: 45,
                    backgroundColor: "#F0F0F0",
                    zIndex: 11,
                  }}
                >
                  총점({total})
                </TableCell>
                {head}
              </TableRow>
            </TableHead>
            <TableBody>
              {scores.dashscore.map((item) => {
                let s_total = 0;
                const r = scores.meta.problems.map((p) => {
                  if (item[p._id] !== undefined) {
                    s_total += item[p._id];

                    return (
                      <TableCell>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            fetch(BASE_URL + "/api/resubmission", {
                              method: "POST",
                              headers: {
                                Authorization:
                                  "bearer " + localStorage.getItem("token"),
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                submissions: [
                                  item.submission.filter(
                                    (it) => it.problem === p._id
                                  )[0].submission,
                                ],
                              }),
                            })
                              .then((res) => {
                                return res.json();
                              })
                              .then((data) => {
                                console.log(data);
                                alert(
                                  "재채점이 완료되었습니다." +
                                    item[p._id] +
                                    "=>" +
                                    data.data.score
                                );
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          }}
                        >
                          {item[p._id]}
                        </Button>
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell>
                        <Button variant="outlined" disabled>
                          {0}
                        </Button>
                      </TableCell>
                    );
                  }
                });
                return (
                  <TableRow>
                    <TableCell
                      style={{
                        position: "sticky",
                        left: 0,
                        zIndex: 10,
                        backgroundColor: "white",
                      }}
                    >
                      {scores.meta.students.reduce((acc, cur) => {
                        if (cur._id === item.student) {
                          return cur.name;
                        } else {
                          return acc + "";
                        }
                      }, "")}
                    </TableCell>
                    <TableCell
                      style={{
                        position: "sticky",
                        left: 45,
                        zIndex: 10,
                        backgroundColor: "white",
                      }}
                    >
                      {s_total}
                    </TableCell>
                    {r}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
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

  const requestPractice = (item) => {
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
  };
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
                    </Typography>{" "}
                    <Dash scores={scores} requestPractice={requestPractice} />
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

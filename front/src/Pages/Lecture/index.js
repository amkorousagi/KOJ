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
  IconButton,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Add,
  Delete,
  DisabledByDefault,
  DownloadOutlined,
  Edit,
  ExpandLess,
  ExpandMore,
  UploadFileOutlined,
} from "@mui/icons-material";
import Submit from "./Submit.js";
import Score from "./Score.js";
import { BASE_URL, FILE_URL } from "../../config.js";
import CreatePractice from "./CreatePractice.js";
import CreateProblem from "./CreateProblem.js";
import CreateTestcase from "./CreateTestcase.js";
import Testcase from "./Testcase.js";
import UpdatePractice from "./UpdatePractice.js";
import UpdateProblem from "./UpdateProblem.js";
import UpdateTestcase from "./UpdateTestcase.js";
import { Stack } from "@mui/system";
import StudentExcel from "./StudentExcel.js";

const LectureDate = ({ pracStart, pracEnd }) => {
  if (pracStart !== "") {
    return (
      <div style={{ marginTop: 5 }}>
        실습 시작 <br />
        {new Date(pracStart).toLocaleString("ko-KR").split(". 오")[0]}
        .
        <br />오{new Date(pracStart).toLocaleString("ko-KR").split(". 오")[1]}
        <hr />
        실습 종료 <br />
        {new Date(pracEnd).toLocaleString("ko-KR").split(". 오")[0]}
        .
        <br />오{new Date(pracEnd).toLocaleString("ko-KR").split(". 오")[1]}
      </div>
    );
  } else {
    return (
      <div style={{ marginTop: 5 }}>
        실습 시작 <br />
        <br />
        <br />
        <hr />
        실습 종료 <br />
        <br />
        <br />
      </div>
    );
  }
};

const Lecture = ({ userId, userType }) => {
  const { lectureId, lectureTitle } = useParams();
  //console.log(lectureId);
  const [open, setOpen] = React.useState({});
  const [openModal, setOpenModal] = React.useState(false);
  const [openModal2, setOpenModal2] = React.useState(false);
  const [openModal3, setOpenModal3] = React.useState(false);
  const [openModal4, setOpenModal4] = React.useState(false);
  const [openModal5, setOpenModal5] = React.useState(false);
  const [openModal6, setOpenModal6] = React.useState(false);
  const [openUpdatePractice, setOpenUpdatePractice] = React.useState(false);
  const [openUpdateProblem, setOpenUpdateProblem] = React.useState(false);
  const [openUpdateTestcase, setOpenUpdateTestcase] = React.useState(false);
  const [practiceData, setPracticeData] = React.useState([]);
  const [currentProblem, setCurrentProblem] = React.useState({});
  const [currentPDF, setCurrentPDF] = React.useState([]);
  const [curPracId, setCurPracId] = React.useState("");
  const [curPracTitle, setCurPracTitle] = React.useState("");
  const [problemData, setProblemData] = React.useState({});
  const [testcaseData, setTestcaseData] = React.useState({});
  const [openTest, setOpenTest] = React.useState({});
  const [curTestcase, setCurTestcase] = React.useState({});
  const [curPractice, setCurPractice] = React.useState({});
  const [nProblem, setNProblem] = React.useState(0);
  const [nPractice, setNPractice] = React.useState(0);
  const [nTestcase, setNTestcase] = React.useState(0);
  const [pracStart, setPracStart] = React.useState("");
  const [pracEnd, setPracEnd] = React.useState("");
  const [currentScore, setCurrentScore] = React.useState(0);
  const [maxScore, setMaxScore] = React.useState(0);
  const openOnlyModal2 = () => {
    setOpenModal(false);
    setOpenModal2(true);
  };
  const handleOpenModal2 = () => {
    setOpenModal2(!openModal2);
  };
  const handleOpenModal = () => {
    if (currentProblem._id === undefined || currentProblem === {}) {
      console.log(currentProblem);
      alert("문제를 선택하세요.");
      return;
    }
    setOpenModal(!openModal);
  };
  const handleClick = (i) => {
    const o = { ...open };
    o[i] = !o[i];
    setOpen(o);
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
        setPracticeData(
          data.data.sort((a, b) => {
            if (a.created_date > b.created_date) {
              return 1;
            }
            if (a.created_date < b.created_date) {
              return -1;
            }
            return 0;
          })
        );
        setNPractice(data.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const practices = practiceData.map((item, index) => {
    //console.log(item);

    console.log(problemData[item._id]);
    let problems;
    if (problemData[item._id] === undefined) {
      problems = <></>;
    } else {
      problems = problemData[item._id].map((p) => {
        //console.log(p);
        let testcases;
        if (testcaseData[p._id] === undefined) {
          testcases = <></>;
        } else {
          testcases = testcaseData[p._id].map((t) => {
            //console.log(t);

            let editAndDelete = <></>;
            if (userType === "professor") {
              editAndDelete = (
                <>
                  <IconButton
                    onClick={() => {
                      setCurTestcase(t);
                      setOpenUpdateTestcase(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      fetch(BASE_URL + "/api/deleteTestcase", {
                        method: "POST",
                        headers: {
                          Authorization:
                            "bearer " + localStorage.getItem("token"),
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          testcase: t._id,
                        }),
                      })
                        .then((res) => {
                          return res.json();
                        })
                        .then((data) => {
                          window.location.reload();
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  >
                    <Delete />
                  </IconButton>
                </>
              );
            }
            let tc;
            tc = (
              <Button
                style={{ width: "100%", textAlign: "left" }}
                onClick={() => {
                  setCurTestcase(t);
                  setOpenUpdateTestcase(true);
                }}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <ListItemText primary={t.title} />
              </Button>
            );
            return (
              <ListItem>
                {tc}
                {editAndDelete}
              </ListItem>
            );
          });
        }
        let editAndDelete2 = <></>;
        if (userType === "professor") {
          editAndDelete2 = (
            <>
              <IconButton
                onClick={() => {
                  setCurrentProblem(p);
                  setOpenUpdateProblem(true);
                }}
              >
                <Edit />
              </IconButton>
              <IconButton
                onClick={() => {
                  fetch(BASE_URL + "/api/deleteProblem", {
                    method: "POST",
                    headers: {
                      Authorization: "bearer " + localStorage.getItem("token"),
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      problem: p._id,
                    }),
                  })
                    .then((res) => {
                      return res.json();
                    })
                    .then((data) => {
                      window.location.reload();
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                <Delete />
              </IconButton>
            </>
          );
        }
        let add = <></>;
        if (userType === "professor") {
          add = (
            <>
              <ListItem>
                <Button
                  variant="contained"
                  style={{ margin: "5px" }}
                  startIcon={<Add />}
                  onClick={() => {
                    setNTestcase(testcases.length);
                    setCurrentProblem(p);
                    setOpenModal5(true);
                  }}
                >
                  테스트케이스 생성
                </Button>
              </ListItem>
            </>
          );
        }
        let collapse_testcase = <></>;
        if (userType === "professor" && p.problem_type !== "result") {
          collapse_testcase = (
            <Collapse in={openTest[p._id]} timeout="auto" unmountOnExit>
              <List
                disablePadding
                subheader={
                  <ListSubheader>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;테스트케이스
                  </ListSubheader>
                }
              >
                {testcases}
                {add}
              </List>
            </Collapse>
          );
        }
        return (
          <>
            <ListItem
              button
              onClick={() => {
                setCurrentProblem(p);
                setCurrentPDF(p.pdf);
                setCurPracTitle(item.title);
                setMaxScore(p.score);
                fetch(BASE_URL + "/api/readProblemScore", {
                  method: "POST",
                  headers: {
                    Authorization: "bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    problem: p._id,
                    student: userId,
                  }),
                })
                  .then((res) => {
                    return res.json();
                  })
                  .then((data) => {
                    //console.log("readProblemScore ", data);
                    if (data.data === undefined || data.data.length === 0) {
                      setCurrentScore(0);
                    } else {
                      setCurrentScore(data.data[0].score);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                fetch(BASE_URL + "/api/readTestcase", {
                  method: "POST",
                  headers: {
                    Authorization: "bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    problem: p._id,
                  }),
                })
                  .then((res) => {
                    return res.json();
                  })
                  .then((data) => {
                    //console.log(data);
                    const dd = {};
                    dd[p._id] = data.data;
                    setTestcaseData({ ...testcaseData, ...dd });
                  })
                  .catch((err) => console.log(err));

                const o = { ...openTest };
                if (o[p._id] === undefined) {
                  o[p._id] = true;
                } else {
                  o[p._id] = !o[p._id];
                }

                setOpenTest(o);
              }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;
              <ListItemText primary={p.title} />
              {editAndDelete2}
              {userType === "professor" && p.problem_type !== "result" ? (
                openTest[p._id] ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )
              ) : (
                <></>
              )}
            </ListItem>
            {userType === "professor" ? collapse_testcase : <></>}
          </>
        );
      });
    }
    let editAndDelete3 = <></>;
    if (userType === "professor") {
      editAndDelete3 = (
        <>
          <IconButton
            onClick={() => {
              setCurPractice(item);
              setOpenUpdatePractice(true);
            }}
          >
            <Edit />
          </IconButton>
          <IconButton
            onClick={() => {
              fetch(BASE_URL + "/api/deletePractice", {
                method: "POST",
                headers: {
                  Authorization: "bearer " + localStorage.getItem("token"),
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  practice: item._id,
                }),
              })
                .then((res) => {
                  return res.json();
                })
                .then((data) => {
                  window.location.reload();
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            <Delete />
          </IconButton>
        </>
      );
    }
    let add2 = <></>;
    if (userType === "professor") {
      add2 = (
        <>
          <ListItem style={{ alignItems: "right" }}>
            <Button
              variant="contained"
              style={{ margin: "5px" }}
              startIcon={<Add />}
              onClick={() => {
                setNProblem(problems.length);
                setCurPracId(item._id);
                setCurPracTitle(item.title);
                setOpenModal4(true);
              }}
            >
              문제 생성
            </Button>
          </ListItem>
        </>
      );
    }
    return (
      <>
        <ListItem
          button
          onClick={() => {
            setPracStart(item.start_date);
            setPracEnd(item.end_date);
            fetch(BASE_URL + "/api/readProblem", {
              method: "POST",
              headers: {
                Authorization: "bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                practice: item._id,
              }),
            })
              .then((res) => {
                return res.json();
              })
              .then((data) => {
                console.log("problame data ", data);
                const cc = {};
                cc[item._id] = data.data;
                setProblemData({ ...problemData, ...cc });
              })
              .catch((err) => console.log(err));

            handleClick(index);
          }}
        >
          <ListItemText primary={item.title} />
          {editAndDelete3}
          {open[index] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open[index]} timeout="auto" unmountOnExit>
          <List
            disablePadding
            subheader={
              <ListSubheader>&nbsp;&nbsp;&nbsp;&nbsp;문제</ListSubheader>
            }
          >
            {problems}

            {add2}
          </List>
        </Collapse>
      </>
    );
  });
  let add3 = <></>;
  if (userType === "professor") {
    add3 = (
      <>
        <ListItem>
          <Button
            variant="contained"
            style={{ margin: "5px" }}
            startIcon={<Add />}
            onClick={() => {
              setOpenModal3(true);
            }}
          >
            실습 생성
          </Button>
        </ListItem>
      </>
    );
  }
  return (
    <>
      <Testcase
        open={openModal6}
        handleClose={() => {
          setOpenModal6(false);
        }}
        testcase={curTestcase}
      />
      <Submit
        open={openModal}
        openScore={openOnlyModal2}
        handleClose={handleOpenModal}
        problem_id={currentProblem._id}
        problem={currentProblem}
      />
      <Score
        open={openModal2}
        handleClose={() => {
          setOpenModal2(false);
        }}
        userId={userId}
        problemId={currentProblem._id}
      />
      <CreatePractice
        open={openModal3}
        handleClose={() => {
          setOpenModal3(false);
        }}
        lecture_id={lectureId}
        nPractice={nPractice}
      />
      <CreateProblem
        open={openModal4}
        handleClose={() => {
          setOpenModal4(false);
        }}
        practiceId={curPracId}
        practiceTitle={curPracTitle}
        nProblem={nProblem}
      />
      <CreateTestcase
        open={openModal5}
        handleClose={() => {
          setOpenModal5(false);
        }}
        problemId={currentProblem._id}
        problemTitle={currentProblem.title}
        nTestcase={nTestcase}
      />
      <UpdatePractice
        open={openUpdatePractice}
        handleClose={() => {
          setOpenUpdatePractice(false);
        }}
        lecture_id={lectureId}
        nPractice={nPractice}
        curPractice={curPractice}
      />
      <UpdateProblem
        open={openUpdateProblem}
        handleClose={() => {
          setOpenUpdateProblem(false);
        }}
        practiceId={curPracId}
        practiceTitle={curPracTitle}
        nProblem={nProblem}
        curProblem={currentProblem}
      />
      <UpdateTestcase
        open={openUpdateTestcase}
        handleClose={() => {
          setOpenUpdateTestcase(false);
        }}
        problemId={currentProblem._id}
        problemTitle={currentProblem.title}
        nTestcase={nTestcase}
        curTestcase={curTestcase}
      />
      <Grid container>
        <Grid item xs={3} style={{ zIndex: 5 }}>
          <div
            style={{
              width: "100%",
              backgroundColor: "#F0F0F0",
            }}
          >
            <StudentExcel lectureId={lectureId} />
            <List
              subheader={<ListSubheader>{lectureTitle}</ListSubheader>}
              style={{
                width: "100%",
              }}
            >
              {practices}
              <hr />
              {add3}
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
            <Grid item xs={6} style={{ marginBottom: 15 }}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                style={{ textAlign: "center", fontWeight: 700 }}
              >
                <Card variant="outlined">
                  <CardContent>
                    <LectureDate pracStart={pracStart} pracEnd={pracEnd} />
                  </CardContent>
                </Card>
                &nbsp;&nbsp;
                <Card
                  display="flex"
                  variant="outlined"
                  justifyContent="center"
                  alignItems="center"
                >
                  <CardContent>
                    <div style={{ marginTop: 5 }}>
                      문제 점수
                      <hr /> {currentScore}/{maxScore}
                    </div>
                  </CardContent>
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
                <Button onClick={handleOpenModal2}>
                  <Card variant="outlined">
                    <CardContent>
                      <div
                        style={{
                          marginTop: 5,
                          fontFamily: "Nanum Gothic",
                          fontWeight: 800,
                          fontSize: 18,
                        }}
                      >
                        채점 기록
                      </div>
                    </CardContent>
                  </Card>
                </Button>
                &nbsp;&nbsp;
                <Button onClick={handleOpenModal}>
                  <Card variant="outlined">
                    <CardContent>
                      <div
                        style={{
                          marginTop: 5,
                          fontFamily: "Nanum Gothic",
                          fontWeight: 800,
                          fontSize: 18,
                        }}
                      >
                        정답 제출
                      </div>
                    </CardContent>
                  </Card>
                </Button>
              </Box>
            </Grid>
            <br />
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
                        {currentProblem.title} of {curPracTitle}
                      </div>
                      <hr />
                    </Typography>
                    {currentProblem.description}
                    <br />
                    <hr />
                    {currentPDF.map((item) => {
                      return (
                        <object
                          data={FILE_URL + "/" + item}
                          type="application/pdf"
                          width="100%"
                          style={{ aspectRatio: 2 / 3 }}
                        >
                          <embed
                            src={FILE_URL + "/" + item}
                            type="application/pdf"
                            width="100%"
                            style={{ aspectRatio: 2 / 3 }}
                          />
                        </object>
                      );
                    })}
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

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
import SideMenu from "./SideMenu.js";

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
  const [open, setOpen] = React.useState(
    localStorage.getItem("open") === "null" ||
      localStorage.getItem("open") === null
      ? {}
      : JSON.parse(localStorage.getItem("open"))
  );
  const [openTest, setOpenTest] = React.useState(
    localStorage.getItem("openTest") === "null" ||
      localStorage.getItem("openTest") === null
      ? {}
      : JSON.parse(localStorage.getItem("openTest"))
  );

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
  const [problemData, setProblemData] = React.useState({});
  const [testcaseData, setTestcaseData] = React.useState({});

  const [curPractice, setCurPractice] = React.useState(
    localStorage.getItem("curPractice") === "null" ||
      localStorage.getItem("curPractice") === null
      ? {}
      : JSON.parse(localStorage.getItem("curPractice"))
  );
  const [curProblem, setCurProblem] = React.useState(
    localStorage.getItem("curProblem") === "null" ||
      localStorage.getItem("curProblem") === null
      ? {}
      : JSON.parse(localStorage.getItem("curProblem"))
  );
  const [curTestcase, setCurTestcase] = React.useState(
    localStorage.getItem("curTestcase") === "null" ||
      localStorage.getItem("curTestcase") === null
      ? {}
      : JSON.parse(localStorage.getItem("curTestcase"))
  );
  const [currentScore, setCurrentScore] = React.useState(
    localStorage.getItem("currentScore") === "null" ||
      localStorage.getItem("currentScore") === null
      ? 0
      : JSON.parse(localStorage.getItem("currentScore"))
  );

  const [state, setState] = React.useState("before");
  const openOnlyModal2 = () => {
    setOpenModal(false);
    setOpenModal2(true);
  };
  const handleOpenModal2 = () => {
    setOpenModal2(!openModal2);
  };
  const handleOpenModal = () => {
    if (curProblem._id === undefined || curProblem === {}) {
      console.log(curProblem);
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
  useEffect(() => {
    localStorage.setItem("open", JSON.stringify(open));
  }, [open]);
  useEffect(() => {
    localStorage.setItem("openTest", JSON.stringify(openTest));
  }, [openTest]);
  useEffect(() => {
    localStorage.setItem("curPractice", JSON.stringify(curPractice));
  }, [curPractice]);
  useEffect(() => {
    localStorage.setItem("curProblem", JSON.stringify(curProblem));
  }, [curProblem]);
  useEffect(() => {
    localStorage.setItem("curTestcase", JSON.stringify(curTestcase));
  }, [curTestcase]);

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
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    const asyncHelper = async () => {
      let newProblemData = {};
      let newTestData = {};
      let testcasePromises = [];
      const problemPromises = practiceData.map((item) => {
        return fetch(BASE_URL + "/api/readProblem", {
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

            testcasePromises = testcasePromises.concat(
              cc[item._id].map((p) => {
                return fetch(BASE_URL + "/api/readTestcase", {
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
                    newTestData = { ...newTestData, ...dd };
                  })
                  .catch((err) => console.log(err));
              })
            );
            newProblemData = { ...newProblemData, ...cc };
          })
          .catch((err) => console.log(err));
      });
      await Promise.all(problemPromises);
      setProblemData(newProblemData);
      await Promise.all(testcasePromises);
      setTestcaseData(newTestData);
    };
    asyncHelper();
  }, [practiceData]);
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
        problem_id={curProblem._id}
        problem={curProblem}
        state={state}
      />
      <Score
        open={openModal2}
        handleClose={() => {
          setOpenModal2(false);
        }}
        userId={userId}
        problemId={curProblem._id}
      />
      <CreatePractice
        open={openModal3}
        handleClose={() => {
          setOpenModal3(false);
        }}
        lecture_id={lectureId}
        nPractice={practiceData.length}
      />
      <CreateProblem
        open={openModal4}
        handleClose={() => {
          setOpenModal4(false);
        }}
        practiceId={curPractice._id}
        practiceTitle={curPractice.title}
        nProblem={
          problemData[curPractice._id] !== undefined
            ? problemData[curPractice._id].length
            : 0
        }
      />
      <CreateTestcase
        open={openModal5}
        handleClose={() => {
          setOpenModal5(false);
        }}
        problemId={curProblem._id}
        problemTitle={curProblem.title}
        nTestcase={
          testcaseData[curProblem._id] !== undefined
            ? testcaseData[curProblem._id].length
            : 0
        }
      />
      <UpdatePractice
        open={openUpdatePractice}
        handleClose={() => {
          setOpenUpdatePractice(false);
        }}
        lecture_id={lectureId}
        nPractice={practiceData.length}
        curPractice={curPractice}
      />
      <UpdateProblem
        open={openUpdateProblem}
        handleClose={() => {
          setOpenUpdateProblem(false);
        }}
        practiceId={curPractice._id}
        practiceTitle={curPractice.title}
        nProblem={
          problemData[curPractice._id] !== undefined
            ? problemData[curPractice._id].length
            : 0
        }
        curProblem={curProblem}
      />
      <UpdateTestcase
        open={openUpdateTestcase}
        handleClose={() => {
          setOpenUpdateTestcase(false);
        }}
        problemId={curProblem._id}
        problemTitle={curProblem.title}
        nTestcase={
          testcaseData[curProblem._id] !== undefined
            ? testcaseData[curProblem._id].length
            : 0
        }
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
              subheader={
                <ListSubheader>{`${lectureTitle}(종료후)`}</ListSubheader>
              }
              style={{
                width: "100%",
              }}
            >
              <SideMenu
                state={"after"}
                userId={userId}
                userType={userType}
                practiceData={practiceData.filter((item) => {
                  return new Date(item.end_date) < Date.now();
                })}
                problemData={problemData}
                testcaseData={testcaseData}
                openTest={openTest}
                open={open}
                setCurTestcase={setCurTestcase}
                setOpenUpdateTestcase={setOpenUpdateTestcase}
                setCurProblem={setCurProblem}
                setOpenUpdateProblem={setOpenUpdateProblem}
                setOpenModal5={setOpenModal5}
                setCurrentScore={setCurrentScore}
                setTestcaseData={setTestcaseData}
                setOpenTest={setOpenTest}
                setCurPractice={setCurPractice}
                setOpenUpdatePractice={setOpenUpdatePractice}
                setOpenModal4={setOpenModal4}
                setProblemData={setProblemData}
                handleClick={handleClick}
                setState={setState}
              />
            </List>
            <hr />

            <List
              subheader={
                <ListSubheader>{`${lectureTitle}(진행중)`}</ListSubheader>
              }
              style={{
                width: "100%",
              }}
            >
              <SideMenu
                state={"progress"}
                userId={userId}
                userType={userType}
                practiceData={practiceData.filter((item) => {
                  return (
                    new Date(item.start_date) <= Date.now() &&
                    Date.now() <= new Date(item.end_date)
                  );
                })}
                problemData={problemData}
                testcaseData={testcaseData}
                openTest={openTest}
                open={open}
                setCurTestcase={setCurTestcase}
                setOpenUpdateTestcase={setOpenUpdateTestcase}
                setCurProblem={setCurProblem}
                setOpenUpdateProblem={setOpenUpdateProblem}
                setOpenModal5={setOpenModal5}
                setCurrentScore={setCurrentScore}
                setTestcaseData={setTestcaseData}
                setOpenTest={setOpenTest}
                setCurPractice={setCurPractice}
                setOpenUpdatePractice={setOpenUpdatePractice}
                setOpenModal4={setOpenModal4}
                setProblemData={setProblemData}
                handleClick={handleClick}
                setState={setState}
              />
            </List>
            <hr />
            <List
              subheader={
                <ListSubheader>{`${lectureTitle}(시작전)`}</ListSubheader>
              }
              style={{
                width: "100%",
              }}
            >
              <SideMenu
                state={"before"}
                userId={userId}
                userType={userType}
                practiceData={practiceData.filter((item) => {
                  return Date.now() < new Date(item.start_date);
                })}
                problemData={problemData}
                testcaseData={testcaseData}
                openTest={openTest}
                open={open}
                setCurTestcase={setCurTestcase}
                setOpenUpdateTestcase={setOpenUpdateTestcase}
                setCurProblem={setCurProblem}
                setOpenUpdateProblem={setOpenUpdateProblem}
                setOpenModal5={setOpenModal5}
                setCurrentScore={setCurrentScore}
                setTestcaseData={setTestcaseData}
                setOpenTest={setOpenTest}
                setCurPractice={setCurPractice}
                setOpenUpdatePractice={setOpenUpdatePractice}
                setOpenModal4={setOpenModal4}
                setProblemData={setProblemData}
                handleClick={handleClick}
                setState={setState}
              />
            </List>
            <hr />
            {add3}
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
                    <LectureDate
                      pracStart={curPractice.start_date}
                      pracEnd={curPractice.end_date}
                    />
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
                      <hr /> {currentScore}/{curProblem.score}
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
                        {curProblem.title} of {curPractice.title}
                      </div>
                      <hr />
                    </Typography>
                    {curProblem.description}
                    <br />
                    <hr />
                    {curProblem.pdf !== undefined ? (
                      curProblem.pdf.map((item) => {
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
                      })
                    ) : (
                      <></>
                    )}
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

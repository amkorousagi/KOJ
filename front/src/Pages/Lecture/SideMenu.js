import {
  Button,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import { Add, Delete, Edit, ExpandLess, ExpandMore } from "@mui/icons-material";
import { BASE_URL } from "../../config.js";
import { USER_TYPE } from "../../type.js";
import { useEffect } from "react";

const SideMenu = ({
  state,
  userId,
  userType,
  practiceData,
  problemData,
  testcaseData,
  openTest,
  open,
  setCurTestcase,
  setOpenUpdateTestcase,
  setCurrentProblem,
  setOpenUpdateProblem,
  setNTestcase,
  setOpenModal5,
  setCurrentPDF,
  setCurPracTitle,
  setMaxScore,
  setCurrentScore,
  setTestcaseData,
  setOpenTest,
  setCurPractice,
  setOpenUpdatePractice,
  setNProblem,
  setCurPracId,
  setOpenModal4,
  setPracStart,
  setPracEnd,
  setProblemData,
  handleClick,
  setState,
}) => {
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

  const practices = practiceData.map((item, index) => {
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
                  setState(state);
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
                    setState(state);
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
                setState(state);
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
    if (state === "before" && userType === USER_TYPE.STUDENT) {
      return (
        <>
          <ListItem>
            <ListItemText primary={item.title} />
          </ListItem>
        </>
      );
    } else {
      return (
        <>
          <ListItem
            button
            onClick={() => {
              setPracStart(item.start_date);
              setPracEnd(item.end_date);

              handleClick(item._id);
            }}
          >
            <ListItemText primary={item.title} />
            {editAndDelete3}
            {open[item._id] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open[item._id]} timeout="auto" unmountOnExit>
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
    }
  });
  return practices;
};

export default SideMenu;

import {
  Card,
  Box,
  CardContent,
  Button,
  Modal,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Typography,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  IconButton,
  InputAdornment,
  ListItem,
  List,
} from "@material-ui/core";
import {
  Add,
  AttachFileOutlined,
  Close,
  DeleteOutlined,
  Label,
  Save,
} from "@mui/icons-material";
import { ListItemButton } from "@mui/material";
import React, { useEffect, useLayoutEffect } from "react";
import { BASE_URL, DOWNLOAD_URL, FILE_URL } from "../../config.js";

const UpdateProblem = ({
  open,
  handleClose,
  practiceId,
  practiceTitle,
  nProblem,
  curProblem,
}) => {
  console.log(curProblem);
  const [title, setTitle] = React.useState("");
  const [problem_type, setProblem_type] = React.useState("");
  const [score, setScore] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [files, setFiles] = React.useState([]);
  const [result, setResult] = React.useState("");
  const [execution_time_limit, setExecution_time_limit] = React.useState(0);
  const [existings, setExistings] = React.useState([]);
  const [at, setAt] = React.useState([]);
  const [blank, setBlank] = React.useState("");
  const [blank_language, setBlank_language] = React.useState("c");
  const updateProblem = () => {
    if (execution_time_limit > 10000) {
      alert("실행시간은 10 초(10000ms)를 초과할 수 없습니다");
      return;
    }
    //먼저 파일 업로드
    //파일 코드를 받으면 보내기
    const formData = new FormData();
    for (const item of files) {
      formData.append(item.name, item.name);
    }
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    fetch(FILE_URL, {
      method: "post",
      headers: {
        //"Content-Type":""
      },
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const update = {
          problem: curProblem._id,
        };
        if (execution_time_limit) {
          update.execution_time_limit = execution_time_limit;
        }
        if (problem_type) {
          update.problem_type = problem_type;
        }
        if (title) {
          update.title = title;
        }
        if (description) {
          update.description = description;
        }
        if (score) {
          update.score = score;
        }
        if (result) {
          update.result_answer = result;
        }
        if (data.files) {
          update.pdf = [...existings, ...data.files];
        }
        if (blank) {
          update.blank = blank;
        }
        if (blank_language) {
          update.blank_language = blank_language;
        }

        fetch(BASE_URL + "/api/updateProblem", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(update),
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            if (data.success) {
              handleClose();
              window.location.reload();
            } else {
              console.log("error");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /*
  useLayoutEffect(() => {
    let fileInput = document.querySelector(".fileInput");
    let preview = document.querySelector(".preview");

    const fileTypes = [
      "application/pdf", // 한컴 pdf 확인
    ];
    function validFileType(file) {
      return fileTypes.includes(file.type);
    }
    function returnFileSize(number) {
      if (number < 1024) {
        return number + "bytes";
      } else if (number >= 1024 && number < 1048576) {
        return (number / 1024).toFixed(1) + "KB";
      } else if (number >= 1048576) {
        return (number / 1048576).toFixed(1) + "MB";
      }
    }
    function updateImageDisplay() {
      while (preview.firstChild) {
        preview.removeChild(preview.firstChild);
      }

      const curFiles = fileInput.files;
      setFiles(curFiles);
      if (curFiles.length === 0) {
        const para = document.createElement("p");
        para.textContent = "선택된 파일 없음";
        preview.appendChild(para);
      } else {
        const list = document.createElement("ol");
        preview.appendChild(list);

        for (const file of curFiles) {
          const listItem = document.createElement("li");
          const para = document.createElement("p");
          if (validFileType(file)) {
            para.textContent = `File name ${
              file.name
            }, file size ${returnFileSize(file.size)}.`;
            //const image = document.createElement("img");
            //image.src = URL.createObjectURL(file);

            //listItem.appendChild(image);
            listItem.appendChild(para);
          } else {
            para.textContent = `File name ${file.name} 가 유효한 파일 형식이 아닙니다. 다시 선택하십시오.`;
            listItem.appendChild(para);
          }

          list.appendChild(listItem);
        }
      }
    }
    fileInput.addEventListener("change", updateImageDisplay);
  }, []);
  */
  useEffect(() => {
    console.log(curProblem);
    if (curProblem !== undefined && Object.keys(curProblem).length !== 0) {
      setExistings([...curProblem.pdf]);
    }
    console.log(curProblem);
  }, [curProblem]);
  useEffect(() => {
    console.log(existings);
    if (curProblem !== undefined && Object.keys(curProblem).length !== 0) {
      setExistings([...curProblem.pdf]);
    }
    console.log(existings);

    let fileInput = document.querySelector(".fileInput");
    let preview = document.querySelector(".preview");
    let intervalId;
    intervalId = setInterval(() => {
      //console.log("ss");
      //console.log(fileInput);
      //console.log(preview);
      if (fileInput && preview) {
        const fileTypes = [
          "application/pdf", // 한컴 pdf 확인
          "image/jpg",
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/bmp",
          "image/svg",
          "image/webp",
        ];
        function validFileType(file) {
          return fileTypes.includes(file.type);
        }
        function returnFileSize(number) {
          if (number < 1024) {
            return number + "bytes";
          } else if (number >= 1024 && number < 1048576) {
            return (number / 1024).toFixed(1) + "KB";
          } else if (number >= 1048576) {
            return (number / 1048576).toFixed(1) + "MB";
          }
        }
        function updateImageDisplay() {
          while (preview.firstChild) {
            preview.removeChild(preview.firstChild);
          }

          const curFiles = fileInput.files;
          setFiles(curFiles);
          if (curFiles.length === 0) {
            const para = document.createElement("p");
            para.textContent = "선택된 파일 없음";
            preview.appendChild(para);
          } else {
            const list = document.createElement("ol");
            preview.appendChild(list);

            for (const file of curFiles) {
              const listItem = document.createElement("li");
              const para = document.createElement("p");
              if (validFileType(file)) {
                para.textContent = `File name ${
                  file.name
                }, file size ${returnFileSize(file.size)}.`;
                //const image = document.createElement("img");
                //image.src = URL.createObjectURL(file);

                //listItem.appendChild(image);
                listItem.appendChild(para);
              } else {
                para.textContent = `File name ${file.name} 가 유효한 파일 형식이 아닙니다. 다시 선택하십시오.`;
                listItem.appendChild(para);
              }

              list.appendChild(listItem);
            }
          }
        }
        fileInput.addEventListener("change", updateImageDisplay);
        clearInterval(intervalId);
      } else {
        fileInput = document.querySelector(".fileInput");
        preview = document.querySelector(".preview");
      }
    }, 500);
  }, []);
  const result_fill = () => {
    if (problem_type === "result") {
      return (
        <>
          <TextField
            variant="outlined"
            label="결과 정답"
            style={{ width: "100%" }}
            defaultValue={curProblem.result}
            multiline
            onChange={(e) => {
              setResult(e.target.value);
            }}
          />
          <br />
          <br />
        </>
      );
    } else {
      return <></>;
    }
  };
  const blank_fill = () => {
    if (problem_type === "blank") {
      return (
        <>
          <TextField
            variant="outlined"
            label="빈칸 문제"
            helperText="빈칸을 삽입하고 싶은 곳에 #BLANK# 를 적으세요"
            style={{ width: "100%" }}
            defaultValue={curProblem.blank}
            multiline
            onChange={(e) => {
              setBlank(e.target.value);
            }}
          />
          <br />
          <br />
          <RadioGroup
            row
            defaultValue={curProblem.blank_language}
            onChange={(e) => {
              e.preventDefault();
              setBlank_language(e.target.value);
            }}
          >
            <FormLabel
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              빈칸 언어&nbsp;&nbsp;
            </FormLabel>
            <FormControlLabel
              value="c"
              label="C"
              labelPlacement="end"
              control={<Radio color="primary" />}
            />
            <FormControlLabel
              value="cpp"
              label="C++"
              labelPlacement="end"
              control={<Radio color="primary" />}
            />
            <FormControlLabel
              value="java"
              label="Java"
              labelPlacement="end"
              control={<Radio color="primary" />}
            />
            <FormControlLabel
              value="python"
              label="Python"
              labelPlacement="end"
              control={<Radio color="primary" />}
            />
            <FormControlLabel
              value="node"
              label="Javascript"
              labelPlacement="end"
              control={<Radio color="primary" />}
            />
          </RadioGroup>
          <br />
          <br />
        </>
      );
    } else {
      return <></>;
    }
  };
  useEffect(() => {
    console.log(existings);
    if (existings !== undefined && Object.keys(existings).length !== 0) {
      console.log(existings);

      Promise.all(
        curProblem.pdf.map(async (fileId) => {
          const response = await fetch(DOWNLOAD_URL + "/" + fileId, {
            method: "get",
          });
          const filename = response.headers.get("pragma");

          return (
            <ListItem>
              <Button
                onClick={async () => {
                  const file = await response.blob();
                  const downloadUrl = window.URL.createObjectURL(file);
                  const anchorElement = document.createElement("a");
                  document.body.appendChild(anchorElement);
                  anchorElement.download = filename; // a tag에 download 속성을 줘서 클릭할 때 다운로드가 일어날 수 있도록 하기
                  anchorElement.href = downloadUrl; // href에 url 달아주기

                  anchorElement.click(); // 코드 상으로 클릭을 해줘서 다운로드를 트리거
                  console.log(anchorElement);
                  document.body.removeChild(anchorElement); // cleanup - 쓰임을 다한 a 태그 삭제
                  window.URL.revokeObjectURL(downloadUrl); // cleanup - 쓰임을 다한 url 객체 삭제
                }}
              >
                {filename}
              </Button>
              <AttachFileOutlined />
              <IconButton
                onClick={() => {
                  console.log(existings);
                  setExistings(
                    existings.filter((e) => {
                      return e !== fileId;
                    })
                  );
                  console.log(existings);
                }}
              >
                <DeleteOutlined />
              </IconButton>
            </ListItem>
          );
        })
      ).then((values) => {
        setAt(values);
      });
    } else {
      setAt([]);
    }
  }, [existings]);
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{
          textAlign: "left",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(2, 2)",
          backfaceVisibility: "hidden",
          zoom: 0.5,
        }}
      >
        <Card variant="outlined" style={{ minWidth: "500px" }}>
          <IconButton
            style={{ position: "absolute", top: 0, right: 0 }}
            onClick={handleClose}
          >
            <Close />
          </IconButton>
          <br />
          <Typography style={{ textAlign: "center", fontWeight: 800 }}>
            {curProblem.title} 문제 수정
          </Typography>
          <hr />
          <CardContent>
            <TextField
              key={curProblem.title}
              variant="outlined"
              label="문제명"
              style={{ width: "100%" }}
              defaultValue={curProblem.title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <br />
            <br />
            <RadioGroup
              row
              key={curProblem.problem_type}
              defaultValue={curProblem.problem_type}
              onChange={(e) => {
                e.preventDefault();
                setProblem_type(e.target.value);
              }}
            >
              <FormLabel
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                문제 유형&nbsp;&nbsp;
              </FormLabel>
              <FormControlLabel
                value="result"
                label="실행결과 예측"
                labelPlacement="end"
                control={<Radio color="primary" />}
              />
              <FormControlLabel
                value="blank"
                label="빈칸 채우기"
                labelPlacement="end"
                control={<Radio color="primary" />}
              />
              <FormControlLabel
                value="solve"
                label="문제 해결"
                labelPlacement="end"
                control={<Radio color="primary" />}
              />
            </RadioGroup>
            <br />
            <br />
            <TextField
              variant="outlined"
              label="실행시간"
              style={{ width: "100%" }}
              type="number"
              defaultValue={
                curProblem.execution_time_limit
                  ? curProblem.execution_time_limit
                  : 1000
              }
              onChange={(e) => {
                setExecution_time_limit(e.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">ms</InputAdornment>
                ),
              }}
            />
            <br />
            <br />
            <TextField
              key={curProblem.score}
              variant="outlined"
              label="점수"
              style={{ width: "100%" }}
              defaultValue={curProblem.score}
              onChange={(e) => {
                setScore(e.target.value);
              }}
            />
            <br />
            <br />
            <TextField
              key={curProblem.description}
              variant="outlined"
              label="설명"
              style={{ width: "100%" }}
              defaultValue={curProblem.description}
              multiline
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <br />
            <br />
            <FormLabel>기존 PDF</FormLabel>
            <br />
            <br />
            <List className="attachments">{at}</List>
            <br />
            <br />
            <FormLabel>새 PDF</FormLabel>
            <br />
            <br />
            <Button variant="outlined" component="label">
              PDF 선택
              <input className="fileInput" type="file" hidden multiple />
            </Button>
            <div className="preview">
              <p>새 파일</p>
            </div>
            <br />
            <br />
            {result_fill()}
            {blank_fill()}
            <Button
              variant="contained"
              style={{ margin: "5px" }}
              startIcon={<Save />}
              onClick={updateProblem}
            >
              문제 수정
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};
export default UpdateProblem;

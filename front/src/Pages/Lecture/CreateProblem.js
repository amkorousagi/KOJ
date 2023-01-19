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
} from "@material-ui/core";
import { Add, Label, Save } from "@mui/icons-material";
import React, { useEffect } from "react";
import { BASE_URL, FILE_URL } from "../../config.js";

const CreateProblem = ({
  open,
  handleClose,
  practiceId,
  practiceTitle,
  nProblem,
}) => {
  const [title, setTitle] = React.useState("문제 " + (nProblem + 1));
  const [problem_type, setProblem_type] = React.useState("solve");
  const [score, setScore] = React.useState(10);
  const [description, setDescription] = React.useState("");
  const [files, setFiles] = React.useState([]);
  const [result, setResult] = React.useState("");
  const createProblem = () => {
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
        fetch(BASE_URL + "/api/createProblem", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            practice: practiceId,
            problem_type,
            title,
            description,
            score,
            pdf: data.files,
            result_answer: result,
          }),
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
  useEffect(() => {
    setTitle("문제 " + (nProblem + 1));
  }, [nProblem]);
  useEffect(() => {
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
        console.log("dd");
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
            defaultValue={result}
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
          <Typography style={{ fontFamily: "Nanum Gothic" }}>
            <div style={{ textAlign: "center", fontWeight: 700, marginTop: 5 }}>
              {practiceTitle} 문제 생성
            </div>
          </Typography>
          <hr />
          <CardContent>
            <TextField
              variant="outlined"
              label="문제명"
              style={{ width: "100%" }}
              defaultValue={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <br />
            <br />
            <RadioGroup
              row
              defaultValue={"real"}
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
                value="real"
                label="문제 해결"
                labelPlacement="end"
                control={<Radio color="primary" />}
              />
            </RadioGroup>
            <br />
            <br />
            <TextField
              variant="outlined"
              label="점수"
              style={{ width: "100%" }}
              defaultValue={score}
              onChange={(e) => {
                setScore(e.target.value);
              }}
            />
            <br />
            <br />
            <TextField
              variant="outlined"
              label="설명"
              style={{ width: "100%" }}
              defaultValue={description}
              multiline
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <br />
            <br />
            <FormLabel>PDF</FormLabel>
            <br />
            <br />
            <Button variant="outlined" component="label">
              PDF 선택
              <input className="fileInput" type="file" hidden multiple />
            </Button>
            <div className="preview">
              <p>선택된 파일 없음</p>
            </div>
            <br />
            <br />
            {result_fill()}
            <Button
              variant="contained"
              style={{ margin: "5px" }}
              startIcon={<Save />}
              onClick={createProblem}
            >
              문제 저장
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};
export default CreateProblem;

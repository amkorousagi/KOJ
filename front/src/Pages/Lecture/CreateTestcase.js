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

const CreateTestcase = ({ open, handleClose, problemId, problemTitle }) => {
  const [title, setTitle] = React.useState("");
  const [score, setScore] = React.useState(10);
  const [hidden, setHidden] = React.useState("private");
  const [input_text, setInput_text] = React.useState("");
  const [output_text, setOutput_text] = React.useState("");
  const [files, setFiles] = React.useState([]);
  const [files2, setFiles2] = React.useState([]);
  const createTestcase = async () => {
    //먼저 파일 업로드
    //파일 코드를 받으면 보내기
    let formData = new FormData();
    for (const item of files) {
      formData.append(item.name, item.name);
    }
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    const input_file = await fetch(FILE_URL, {
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
      })
      .catch((err) => {
        console.log(err);
      });

    formData = new FormData();
    for (const item of files2) {
      formData.append(item.name, item.name);
    }
    for (let i = 0; i < files2.length; i++) {
      formData.append("files", files2[i]);
    }

    const output_file = await fetch(FILE_URL, {
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
      })
      .catch((err) => {
        console.log(err);
      });

    await fetch(BASE_URL + "/api/createTestcase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        problem: problemId,
        title,
        score,
        hidden: hidden === "public" ? true : false,
        input_text,
        output_text,
        input_file,
        output_file,
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
  };

  useEffect(() => {
    let fileInput = document.querySelector(".fileInput");
    let preview = document.querySelector(".preview");
    let intervalId;
    intervalId = setInterval(() => {
      //console.log("ss");
      //console.log(fileInput);
      //console.log(preview);
      if (fileInput && preview) {
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

              para.textContent = `File name ${
                file.name
              }, file size ${returnFileSize(file.size)}.`;
              //const image = document.createElement("img");
              //image.src = URL.createObjectURL(file);

              //listItem.appendChild(image);
              listItem.appendChild(para);

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

    let fileInput2 = document.querySelector(".fileInput2");
    let preview2 = document.querySelector(".preview2");
    let intervalId2;
    intervalId2 = setInterval(() => {
      //console.log("ss");
      //console.log(fileInput);
      //console.log(preview);
      if (fileInput2 && preview2) {
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
          while (preview2.firstChild) {
            preview2.removeChild(preview2.firstChild);
          }

          const curFiles = fileInput2.files;
          setFiles2(curFiles);
          if (curFiles.length === 0) {
            const para = document.createElement("p");
            para.textContent = "선택된 파일 없음";
            preview2.appendChild(para);
          } else {
            const list = document.createElement("ol");
            preview2.appendChild(list);

            for (const file of curFiles) {
              const listItem = document.createElement("li");
              const para = document.createElement("p");

              para.textContent = `File name ${
                file.name
              }, file size ${returnFileSize(file.size)}.`;
              //const image = document.createElement("img");
              //image.src = URL.createObjectURL(file);

              //listItem.appendChild(image);
              listItem.appendChild(para);

              list.appendChild(listItem);
            }
          }
        }
        console.log("dd");
        fileInput2.addEventListener("change", updateImageDisplay);
        clearInterval(intervalId2);
      } else {
        fileInput2 = document.querySelector(".fileInput2");
        preview2 = document.querySelector(".preview2");
      }
    }, 500);
  }, []);

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
              {problemTitle} 테스트케이스 생성
            </div>
          </Typography>
          <hr />
          <CardContent>
            <TextField
              variant="outlined"
              label="테스트케이스명"
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
              defaultValue={"private"}
              onChange={(e) => {
                e.preventDefault();
                setHidden(e.target.value);
              }}
            >
              <FormLabel
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                공개 &nbsp;&nbsp;
              </FormLabel>
              <FormControlLabel
                value="public"
                label="공개"
                labelPlacement="end"
                control={<Radio color="primary" />}
              />
              <FormControlLabel
                value="private"
                label="비공개"
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
              label="표준 입력"
              style={{ width: "100%" }}
              defaultValue={input_text}
              multiline
              onChange={(e) => {
                setInput_text(e.target.value);
              }}
            />
            <br />
            <br />
            <TextField
              variant="outlined"
              label="표준 출력"
              style={{ width: "100%" }}
              defaultValue={output_text}
              multiline
              onChange={(e) => {
                setOutput_text(e.target.value);
              }}
            />
            <br />
            <br />
            <FormLabel>파일 입력</FormLabel>
            <br />
            <br />
            <Button variant="outlined" component="label">
              입력파일 선택
              <input className="fileInput" type="file" hidden multiple />
            </Button>
            <div className="preview">
              <p>선택된 파일 없음</p>
            </div>
            <br />
            <br />
            <FormLabel>파일 출력</FormLabel>
            <br />
            <br />
            <Button variant="outlined" component="label">
              출력파일 선택
              <input className="fileInput2" type="file" hidden multiple />
            </Button>
            <div className="preview2">
              <p>선택된 파일 없음</p>
            </div>
            <br />
            <br />
            <Button
              variant="contained"
              style={{ margin: "5px" }}
              startIcon={<Save />}
              onClick={createTestcase}
            >
              테스트케이스 저장
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};
export default CreateTestcase;

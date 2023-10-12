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
  List,
  ListItem,
} from "@material-ui/core";
import {
  Add,
  AttachFileOutlined,
  Attachment,
  Close,
  Label,
  Save,
} from "@mui/icons-material";
import React, { useEffect } from "react";
import { BASE_URL, DOWNLOAD_URL, FILE_URL, MEDIA_URL } from "../../config.js";

const UpdateTestcase = ({
  open,
  handleClose,
  problemId,
  problemTitle,
  nTestcase,
  curTestcase,
}) => {
  const [title, setTitle] = React.useState(null);
  const [score, setScore] = React.useState(null);
  const [hidden, setHidden] = React.useState(null);
  const [input_text, setInput_text] = React.useState(null);
  const [arg_text, setArg_text] = React.useState(null);
  const [output_text, setOutput_text] = React.useState(null);
  const [files, setFiles] = React.useState([]);
  const [files2, setFiles2] = React.useState([]);
  const [previewInput, setPreviewInput] = React.useState([]);
  const [previewOutput, setPreviewOutput] = React.useState([]);
  const [atInput, setAtInput] = React.useState([]);
  const [atOutput, setAtOutput] = React.useState([]);

  const updateTestcase = async () => {
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
        return data.files;
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
        return data.files;
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("start create testcase");

    const update = {
      testcase: curTestcase._id,
    };
    if (title != null) {
      update.title = title;
    }
    if (score != null) {
      update.score = score;
    }
    if (hidden != null) {
      update.hidden = hidden === "public" ? false : true;
    }
    if (input_text != null) {
      update.input_text = input_text;
    }
    if (arg_text != null) {
      update.arg_text = arg_text;
    }
    if (output_text != null) {
      update.output_text = output_text;
    }
    if (input_file) {
      update.input_file = input_file;
    }
    if (output_file) {
      update.output_file = output_file;
    }
    fetch(BASE_URL + "/api/updateTestcase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(update),
    })
      .then((res) => {
        console.log("got res");
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
    setAtInput([]);
    setAtOutput([]);
  }, [open]);
  useEffect(() => {
    if (curTestcase !== undefined && curTestcase !== {}) {
      if (
        curTestcase.input_file !== undefined &&
        curTestcase.input_file.length !== 0
      ) {
        fetch(MEDIA_URL + "/filename", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            ids: curTestcase.input_file,
          }),
        })
          .then((res) => {
            console.log("got res");
            return res.json();
          })
          .then((data) => {
            console.log(data);
            if (data.success) {
              setPreviewInput(data.files);
            } else {
              console.log("error");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (
        curTestcase.output_file !== undefined &&
        curTestcase.output_file.length !== 0
      ) {
        fetch(MEDIA_URL + "/filename", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            ids: curTestcase.output_file,
          }),
        })
          .then((res) => {
            console.log("got res");
            return res.json();
          })
          .then((data) => {
            console.log(data);
            if (data.success) {
              setPreviewOutput(data.files);
            } else {
              console.log("error");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [curTestcase, open]);
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
  }, [open]);
  useEffect(() => {
    Promise.all(
      previewInput.map(async (item, index) => {
        if (item !== null) {
          const response = await fetch(DOWNLOAD_URL + "/" + item._id, {
            method: "get",
          });
          const filename = response.headers.get("pragma");

          return (
            <ListItem
              button
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
              {index + 1}. {item.description}
              <AttachFileOutlined />
            </ListItem>
          );
        } else {
          return <ListItem button></ListItem>;
        }
      })
    ).then((values) => {
      setAtInput(values);
    });
  }, [previewInput]);
  useEffect(() => {
    Promise.all(
      previewOutput.map(async (item, index) => {
        if (item !== null) {
          const response = await fetch(DOWNLOAD_URL + "/" + item._id, {
            method: "get",
          });
          const filename = response.headers.get("pragma");

          return (
            <ListItem
              button
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
              {index + 1}. {item.description}
              <AttachFileOutlined />
            </ListItem>
          );
        } else {
          return <ListItem button></ListItem>;
        }
      })
    ).then((values) => {
      setAtOutput(values);
    });
  }, [previewOutput]);
  return (
    <Modal open={open} onClose={handleClose}>
      <Box>
        <Card
          variant="outlined"
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{
            textAlign: "left",
            position: "absolute",
            top: "50%",
            left: "50%",
            minWidth: "500px",
            transform: "translate(-50%, -50%)",
            backfaceVisibility: "hidden",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <IconButton
            style={{ position: "absolute", top: 0, right: 0 }}
            onClick={handleClose}
          >
            <Close />
          </IconButton>
          <br />
          <Typography style={{ textAlign: "center", fontWeight: 800 }}>
            {curTestcase.title} 테스트케이스 수정
          </Typography>
          <hr />
          <CardContent>
            <TextField
              key={curTestcase.title}
              variant="outlined"
              label="테스트케이스명"
              style={{ width: "100%" }}
              defaultValue={curTestcase.title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <br />
            <br />
            <RadioGroup
              row
              key={curTestcase.hidden}
              defaultValue={curTestcase.hidden === true ? "private" : "public"}
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
                value={"public"}
                label="공개"
                labelPlacement="end"
                control={<Radio color="primary" />}
              />
              <FormControlLabel
                value={"private"}
                label="비공개"
                labelPlacement="end"
                control={<Radio color="primary" />}
              />
            </RadioGroup>
            <br />
            <br />
            <TextField
              key={curTestcase.score}
              variant="outlined"
              label="점수"
              style={{ width: "100%" }}
              defaultValue={curTestcase.score}
              onChange={(e) => {
                setScore(e.target.value);
              }}
            />
            <br />
            <br />
            <TextField
              variant="outlined"
              label="실행 인자 입력"
              style={{ width: "100%" }}
              defaultValue={curTestcase.arg_text}
              multiline
              onChange={(e) => {
                setArg_text(e.target.value);
              }}
            />
            <br />
            <br />
            <TextField
              key={curTestcase.input_text}
              variant="outlined"
              label="표준 입력"
              style={{ width: "100%" }}
              defaultValue={curTestcase.input_text}
              multiline
              onChange={(e) => {
                setInput_text(e.target.value);
              }}
            />
            <br />
            <br />
            <TextField
              key={curTestcase.output_text}
              variant="outlined"
              label="표준 출력"
              style={{ width: "100%" }}
              defaultValue={curTestcase.output_text}
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
              <p>기존파일</p>
              <List>{atInput}</List>
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
              <p>기존 파일</p>
              <List>{atOutput}</List>
            </div>
            <br />
            <br />
            <Button
              variant="contained"
              style={{ margin: "5px" }}
              startIcon={<Save />}
              onClick={updateTestcase}
            >
              테스트케이스 수정
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};
export default UpdateTestcase;

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
  FormLabel,
  Typography,
  IconButton,
  ListItem,
  List,
} from "@material-ui/core";
import {
  Add,
  AttachFileOutlined,
  Close,
  DeleteOutlined,
  Save,
} from "@mui/icons-material";
import React, { useEffect } from "react";
import { BASE_URL, DOWNLOAD_URL, FILE_URL } from "../../config.js";

const UpdateMaterial = ({
  open,
  handleClose,
  currentMaterial,
  materials,
  setMaterials,
}) => {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [attachments, setAttachments] = React.useState([]);
  const [existings, setExistings] = React.useState([]);
  const [at, setAt] = React.useState([]);

  useEffect(() => {
    setTitle(currentMaterial.title);
    setBody(currentMaterial.body);
    setAttachments(currentMaterial.attachments);
    setExistings(currentMaterial.attachments);
  }, [currentMaterial]);
  useEffect(() => {
    console.log({ existings });
    if (existings !== undefined && Object.keys(existings).length !== 0) {
      console.log({ existings });

      Promise.all(
        existings.map(async (fileId) => {
          const response = await fetch(DOWNLOAD_URL + "/" + fileId, {
            method: "get",
          });
          const filename = decodeURIComponent(
            decodeURIComponent(response.headers.get("pragma"))
          );
          console.log({ filename });
          console.log({ response });
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
          setAttachments(curFiles);
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
  }, [open]);
  //lecture id 보내기
  const updateMaterial = () => {
    //먼저 파일 업로드
    //파일 코드를 받으면 보내기
    const formData = new FormData();
    for (const item of attachments) {
      formData.append(item.name, item.name);
    }
    for (let i = 0; i < attachments.length; i++) {
      formData.append("files", attachments[i]);
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
        const update = {};
        //어차피 title, body 초기화되니까 별로 의미 없음
        if (currentMaterial._id) {
          update.material = currentMaterial._id;
        }
        if (title) {
          update.title = title;
        }
        if (body) {
          update.body = body;
        }
        //이거는 파일입력시에만 활성화되니까 좋음. 이전형태였으면 오류났음
        if (data.files) {
          update.attachments = data.files;
        }
        console.log(data);
        fetch(BASE_URL + "/api/updateMaterial", {
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
              setMaterials(
                materials.map((it) => {
                  if (it._id === data.data._id) {
                    return data.data;
                  } else {
                    return it;
                  }
                })
              );
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
          "backface-visibility": "hidden",
          zoom: 0.5,
          maxHeight: "calc(100vh - 200px)",
          overflowY: "auto",
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
            강의 자료 수정
          </Typography>
          <hr />
          <CardContent>
            <TextField
              variant="outlined"
              label="제목"
              style={{ width: "100%" }}
              defaultValue={currentMaterial.title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <br />
            <br />
            <TextField
              variant="outlined"
              label="내용"
              style={{ width: "100%" }}
              defaultValue={currentMaterial.body}
              onChange={(e) => {
                setBody(e.target.value);
              }}
            />
            <br />
            <br />
            <FormLabel>기존 파일</FormLabel>
            <br />
            <br />
            <List className="attachments">{at}</List>
            <br />
            <br />
            <FormLabel>새 파일</FormLabel>
            <br />
            <br />
            <Button variant="outlined" component="label">
              첨부파일 선택
              <input className="fileInput" type="file" hidden multiple />
            </Button>
            <div className="preview"></div>
            <br />
            <br />
            <Button
              variant="contained"
              style={{ margin: "5px" }}
              startIcon={<Save />}
              onClick={updateMaterial}
            >
              강의자료 수정
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};
export default UpdateMaterial;

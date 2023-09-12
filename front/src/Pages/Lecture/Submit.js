import {
  Card,
  Typography,
  Box,
  CardContent,
  Button,
  Modal,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  IconButton,
  TextField,
} from "@material-ui/core";
import { Close } from "@mui/icons-material";
import React, { useEffect } from "react";
import { BASE_URL, FILE_URL } from "../../config.js";

const Entry = ({ language, files, setEntry }) => {
  if (language === "java" && [...files].length > 1) {
    return (
      <>
        <FormLabel
          style={{
            alignItems: "center",
            textAlign: "center",
          }}
        >
          엔트리 파일
        </FormLabel>
        <br />
        <br />
        <RadioGroup
          row
          onChange={(e) => {
            e.preventDefault();
            setEntry(e.target.value);
          }}
        >
          {[...files].map((item) => {
            return (
              <FormControlLabel
                value={item.name}
                label={item.name}
                labelPlacement="end"
                control={<Radio color="primary" />}
              />
            );
          })}
        </RadioGroup>
        <br />
        <br />
      </>
    );
  } else {
    return <></>;
  }
};

const Submit = ({
  open,
  handleClose,
  openScore,
  problem_id,
  problem,
  state,
}) => {
  const [language, setLanguage] = React.useState("c");
  const [files, setFiles] = React.useState([]);
  const [entry, setEntry] = React.useState("");
  const [result, setResult] = React.useState("");
  const [blank, setBlank] = React.useState([]);
  const blank_input = () => {
    if (problem.blank !== undefined) {
      const words = problem.blank.split("#BLANK#");
      console.log(words);
      const words_b = blank.map((item, index) => {
        return (
          <>
            <TextField
              variant="outlined"
              size="small"
              multiline
              style={{ display: "inline" }}
              onChange={(e) => {
                const o = [...blank];
                o[index] = e.target.value;
                setBlank(o);
              }}
            />
            <span>{words[index + 1]}</span>
          </>
        );
      });

      return (
        <>
          <span>{words[0]}</span>
          {words_b}
        </>
      );
    } else {
      return <></>;
    }
  };
  const blank_input2 = () => {
    if (problem.blank !== undefined) {
      const words = problem.blank.split("#BLANK#");
      console.log(words);
      const words_b = blank.map((item, index) => {
        return (
          <>
            <TextField
              variant="outlined"
              size="small"
              multiline
              fullWidth
              placeholder="코드를 입력하세요!"
              style={{ display: "inline", marginLeft: 5, marginRight: 5 }}
              onChange={(e) => {
                const o = [...blank];
                o[index] = e.target.value;
                setBlank(o);
              }}
            />
            <span>{words[index + 1]}</span>
          </>
        );
      });

      return (
        <>
          <span>{words[0]}</span>
          {words_b}
        </>
      );
    } else {
      return <></>;
    }
  };
  useEffect(() => {
    if (problem.blank !== undefined) {
      let para = problem.blank;
      const cnt = [];
      let indexFirst = para.indexOf("#BLANK");

      while (indexFirst !== -1) {
        cnt.push("");
        indexFirst = para.indexOf("#BLANK", indexFirst + 1);
      }
      setBlank(cnt);
    }
  }, [problem]);
  const dropHandler = (ev) => {
    console.log("File(s) dropped");

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
    const dz = document.getElementById("myDropZone");
    dz.textContent = "";
    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...ev.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
        if (item.kind === "file") {
          const file = item.getAsFile();
          const ext = file.name.split(".").pop();
          if (ext === "sln" || ext === "vcproj") {
            alert(
              "솔루션이나 프로젝트 파일이 아닌 소스코드(.c 등)를 제출하세요!"
            );
            handleClose();
            window.location.reload();
            return;
          }
          if (
            ext !== "c" &&
            ext !== "cpp" &&
            ext !== "java" &&
            ext !== "py" &&
            ext !== "js" &&
            ext !== "h"
          ) {
            alert("유효한 확장자 소스코드(.c 등)를 제출하세요!");
            handleClose();
            window.location.reload();
            return;
          }
          console.log(`… file[${i}].name = ${file.name}`);
          dz.textContent += `...${file.name}\n`;
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      [...ev.dataTransfer.files].forEach((file, i) => {
        console.log(`… file[${i}].name = ${file.name}`);
      });
    }
    const files = ev.dataTransfer.files;
    setFiles(files);
    console.log(files);
  };
  const dragOverHandler = (ev) => {
    console.log("File(s) in drop zone");

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  };
  const changeChooseFile = async (e) => {
    console.log(e.target);
    e.preventDefault();
    const dz = document.getElementById("myDropZone");
    dz.textContent = "";
    const files = e.target.files;

    console.log(files);
    for (const file of files) {
      const ext = file.name.split(".").pop();
      if (ext === "sln" || ext === "vcproj") {
        alert("솔루션이나 프로젝트 파일이 아닌 소스코드(.c 등)를 제출하세요!");
        handleClose();
        window.location.reload();
        return;
      }
      if (
        ext !== "c" &&
        ext !== "cpp" &&
        ext !== "java" &&
        ext !== "py" &&
        ext !== "js" &&
        ext !== "h"
      ) {
        alert("유효한 확장자 소스코드(.c 등)를 제출하세요!");
        handleClose();
        window.location.reload();
        return;
      }
      //console.log(file);
      dz.textContent += `...${file.name}\n`;
    }
    setFiles(files);
  };
  const submitFile = async () => {
    if (state === "before") {
      alert("진행중인 문제가 아닙니다.");
      return;
    }

    if (language === "java" && [...files].length > 1) {
      if (entry === "") {
        alert("엔트리 파일을 설정하세요.(main()있는 파일)");
        return;
      }
    }

    handleClose();
    openScore();
    const formData = new FormData();

    for (const item of files) {
      formData.append(item.name, item.name);
    }
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    console.log(files);
    const codes = await fetch(FILE_URL, {
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
    console.log({ problem_id });
    await fetch(BASE_URL + "/api/createSubmission", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        problem: problem_id,
        code: codes,
        language,
        entry,
        result,
        blank,
        state,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.success) {
        } else {
          console.log("err");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (problem.problem_type === "solve") {
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
              정답 제출
            </Typography>
            <hr />
            <CardContent>
              <FormLabel
                style={{
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                언어
              </FormLabel>
              <br />
              <br />
              <RadioGroup
                row
                defaultValue={language}
                onChange={(e) => {
                  e.preventDefault();
                  setLanguage(e.target.value);
                }}
              >
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
                  label="Node"
                  labelPlacement="end"
                  control={<Radio color="primary" />}
                />
              </RadioGroup>
              <br />
              <br />
              <Entry language={language} files={files} setEntry={setEntry} />
              <FormLabel
                style={{
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                소스 코드
              </FormLabel>
              <br />
              <br />
              <Typography style={{ fontFamily: "Nanum Gothic" }}>
                <div
                  id="drop_zone"
                  onDrop={dropHandler}
                  onDragOver={dragOverHandler}
                  style={{
                    border: "5px solid blue",
                    minHeight: "300px",
                  }}
                >
                  <p
                    id="myDropZone"
                    style={{ whiteSpace: "pre-line", textAlign: "center" }}
                  >
                    <Button component="label" variant="contained">
                      Choose file(s)
                      <input
                        type="file"
                        hidden
                        multiple
                        id="myChooseFile"
                        onChange={changeChooseFile}
                      />
                    </Button>
                    {"\n\n"}
                    or Drag&Drop file(s) {"\n\n"}
                    or Copy&Paste Code {"\n\n"}
                    {blank_input2()}
                  </p>
                </div>
                <br />
              </Typography>{" "}
              <Button variant="contained" style={{}} onClick={submitFile}>
                {" "}
                제출하기
              </Button>
              <Typography style={{ color: "red", fontWeight: 800 }}>
                <br />
                ※성적은 마지막 제출을 기준으로 산정합니다.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    );
  } else if (problem.problem_type === "result") {
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
              정답 제출
            </Typography>
            <hr />
            <CardContent>
              <br />
              <br />
              <TextField
                label="실행 결과"
                fullWidth
                multiline
                onChange={(e) => {
                  setResult(e.target.value);
                }}
              />
              <br />
              <br />
              <Typography style={{ fontFamily: "Nanum Gothic" }}>
                <Button variant="contained" onClick={submitFile}>
                  제출하기
                </Button>
              </Typography>
              <Typography style={{ color: "red", fontWeight: 800 }}>
                <br />
                ※성적은 마지막 제출을 기준으로 산정합니다.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    );
  } else if (problem.problem_type === "blank") {
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
              정답 제출
            </Typography>
            <hr />
            <CardContent>
              <br />
              <br />
              <div
                style={{
                  whiteSpace: "pre-wrap",
                  textAlign: "left",
                  lineHeight: "300%",
                }}
              >
                {blank_input()}
              </div>
              <br />
              <br />
              <Typography style={{ fontFamily: "Nanum Gothic" }}>
                <Button variant="contained" onClick={submitFile}>
                  제출하기
                </Button>
              </Typography>
              <Typography style={{ color: "red", fontWeight: 800 }}>
                <br />
                ※성적은 마지막 제출을 기준으로 산정합니다.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    );
  } else {
    return <></>;
  }
};
export default Submit;

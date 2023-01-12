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
} from "@material-ui/core";
import React from "react";
import { BASE_URL, FILE_URL } from "../../config.js";

const Submit = ({ open, handleClose, openScore, problem_id }) => {
  const [language, setLanguage] = React.useState("c");
  const [files, setFiles] = React.useState([]);
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
    setFiles(files);
    console.log(files);
    for (const file of files) {
      console.log(file);
      dz.textContent += `...${file.name}\n`;
    }
  };
  const submitFile = async () => {
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
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.success) {
          // handleClose();
        } else {
          console.log("err");
        }
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
          textAlign: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Card variant="outlined">
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
                label="Pyton"
                labelPlacement="end"
                control={<Radio color="primary" />}
              />
            </RadioGroup>
            <br />
            <br />
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
                  width: "400px",
                  height: "200px",
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
                  or Drag&Drop file(s)
                </p>
              </div>
              <br />
              <Button variant="contained" onClick={submitFile}>
                {" "}
                제출하기
              </Button>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};
export default Submit;

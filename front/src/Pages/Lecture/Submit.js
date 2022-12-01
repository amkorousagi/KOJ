import {
  Card,
  Typography,
  Box,
  CardContent,
  Button,
  Modal,
} from "@material-ui/core";
import React from "react";
import { FILE_URL } from "../../config.js";

const Submit = ({ open, handleClose, openScore }) => {
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
  const submitFile = () => {
    const formData = new FormData();

    for (const item of files) {
      formData.append(item.name, item.name);
    }
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    console.log(files);
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
            <Typography style={{ fontFamily: "Nanum Gothic" }}>
              <div style={{ textAlign: "center" }}>정답 제출</div>
              <hr />
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

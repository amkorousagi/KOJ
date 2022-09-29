import {
  Card,
  Typography,
  Box,
  CardContent,
  CardHeader,
  Button,
  Modal,
  IconButton,
  Grid,
} from "@material-ui/core";
import { Cancel } from "@mui/icons-material";
import React from "react";

const Submit = ({ open, handleClose }) => {
  const dropHandler = (ev) => {
    console.log("File(s) dropped");

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
    const dz = document.getElementById("myDropZone");
    dz.textContent = "uploading";
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
    files.map((f) => {});
  };
  const dragOverHandler = (ev) => {
    console.log("File(s) in drop zone");

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
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
                  width: "200px",
                  height: "100px",
                }}
              >
                <p
                  id="myDropZone"
                  style={{ whiteSpace: "pre-line", textAlign: "center" }}
                >
                  <Button>Choose a file</Button>
                  {"\n"}
                  or Drag&Drop file
                </p>
              </div>
              연구실 홈페이지 :{" "}
              <a
                href="http://selab.knu.ac.kr/dokuwiki/doku.php"
                style={{ fontFamily: "Nanum Gothic", fontWeight: 800 }}
              >
                selab
              </a>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};
export default Submit;

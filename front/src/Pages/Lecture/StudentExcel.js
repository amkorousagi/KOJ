/*
const data = XLSX.readFile("test.xlsx");

const sheetName = data.SheetNames[0];

const sheet = data.Sheets[sheetName];

const jsoon = XLSX.utils.sheet_to_json(sheet);

const sheeet = XLSX.utils.json_to_sheet(jsoon);

fs.open('test1.json', 'w', function(err, fd){
    if(err) throw err;

    console.log(JSON.stringify(jsoon));
    fs.writeFileSync('test1.json',JSON.stringify(jsoon))
    console.log("done")
})

const xlsxFile = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(xlsxFile, sheeet)
XLSX.writeFile(xlsxFile, 'test2.xlsx')

console.log(1);
*/

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Modal,
  Typography,
} from "@material-ui/core";
import {
  Close,
  CollectionsOutlined,
  DownloadOutlined,
  UploadFileOutlined,
} from "@mui/icons-material";
import React, { useState } from "react";
import { BASE_URL, FILE_URL } from "../../config.js";
import StudentForm from "./StudentForm.xlsx";
import * as xlsx from "xlsx";

const StudentSubmit = ({ open, handleClose, lectureId }) => {
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
      //console.log(file);
      dz.textContent += `...${file.name}\n`;
    }
  };
  const submitFile = async () => {
    //handleClose();
    const reader = new FileReader();
    reader.onload = function () {
      let data = reader.result;
      let workBook = xlsx.read(data, { type: "binary" });
      workBook.SheetNames.forEach(function (sheetName) {
        console.log("SheetName: " + sheetName);
        let rows = xlsx.utils.sheet_to_json(workBook.Sheets[sheetName]);
        console.log(JSON.stringify(rows));
        const users = [];
        for (const r of rows) {
          if (r["학번"] !== undefined) {
            console.log(r);
            console.log(typeof r["이름"]);
            users.push({
              id: r["학번"],
              password: (r["학번"] + "").substring((r["학번"] + "").length - 4),
              name: r["이름"],
              user_type:
                r["유형"] === "학생" ||
                r["유형"] === "" ||
                r["유형"] === undefined
                  ? "student"
                  : r["유형"] === "튜터"
                  ? "tutor"
                  : "student",
            });
          }
        }
        fetch(BASE_URL + "/api/createEnrollStudent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            users,
            lecture: lectureId,
          }),
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            if (data.success) {
              alert("정상적으로 등록되었습니다");
            } else {
              alert("등록 실패");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    };
    reader.readAsBinaryString(files[0]);
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
          <IconButton
            style={{ position: "absolute", top: 0, right: 0 }}
            onClick={handleClose}
          >
            <Close />
          </IconButton>
          <br />
          <Typography style={{ textAlign: "center", fontWeight: 800 }}>
            학생 등록
          </Typography>
          <hr />
          <CardContent>
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
                  학생 등록 엑셀 파일 선택
                  <input
                    type="file"
                    hidden
                    multiple
                    id="myChooseFile"
                    onChange={changeChooseFile}
                  />
                </Button>
                {"\n\n"}
                또는 드로그&드롭
              </p>
            </div>
            <br />
            <Button variant="contained" onClick={submitFile}>
              등록하기
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};

const StudentExcel = ({ lectureId }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <StudentSubmit
        open={open}
        handleClose={() => setOpen(false)}
        lectureId={lectureId}
      />
      <Grid
        container
        style={{
          width: "100%",
          alignContent: "space-between",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid
          item
          xs={6}
          style={{
            display: "flex",
            justifyContent: "center",
            padding: 5,
          }}
        >
          <Button
            onClick={() => {
              document.getElementById("mydownload").click();
            }}
            variant="contained"
            startIcon={<DownloadOutlined />}
          >
            <a
              id="mydownload"
              className="dl"
              style={{ display: "none" }}
              href={StudentForm}
              download="StudentForm.xlsx"
            >
              .
            </a>
            등록 양식
          </Button>
        </Grid>
        <Grid item xs={6} style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            startIcon={<UploadFileOutlined />}
            onClick={() => setOpen(true)}
          >
            학생 등록
          </Button>
        </Grid>
      </Grid>
      <hr />
    </>
  );
};
export default StudentExcel;

const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require("cors");
const FormData = require("form-data");
const fetch = require("node-fetch");

const { Submission } = require("./model/submission.js");
const { Testcase } = require("./model/testcase.js");
const { id, pwd, dbName, ip, port, MEDIA_URL } = require("./config.js");

const fs = require("fs");
const path = require("path");

const upload_testcase_file = multer({
  storage: multer.diskStorage({
    destination: async function (req, file, cb) {
      cb(null, "testcase/" + req.body.testcase_id);
    },
    filename: function (req, file, cb) {
      cb(null, req.body.filename);
    },
  }),
});

const upload_submission = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      // submission?
      cb(null, "submission/" + req.body.submission_id);
    },
    filename: function (req, file, cb) {
      // submission
      cb(null, "code." + req.body.extension); // code
    },
  }),
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post(
  "/upload_file",
  upload_testcase_file.array("files"),
  async (req, res) => {
    res.status(200).json({ success: true });
  }
);

app.post("/upload_code", upload_submission.array("files"), async (req, res) => {
  res.status(200).json({ success: true });
});

app.get("/build_judfe_environment/:testcase_id", async (req, res) => {
  try {
    //디렉토리 먼저 만들기.
    await fs.promises.mkdir(
      path.join(__dirname + "/testcase", req.params.testcase_id)
    );
    const testcase = await Testcase.findById(req.params.testcase_id);
    // 표준입출력
    await fs.promises.writeFile(
      "testcase/" + testcase._id + "/koj_stdin.txt",
      testcase.input_text
    );
    await fs.promises.writeFile(
      "testcase/" + testcase._id + "/koj_stdout.txt",
      testcase.output_text
    );
    //file
    for (const name of testcase.input_file) {
      await fetch(MEDIA_URL + "/file/" + name, {
        method: "POST",
        body: { testcase_id },
      })
        .then((res) => {
          return res.json();
        })
        .catch((err) => console.log(err));
    }
    for (const name of testcase.output_file) {
      await fetch(MEDIA_URL + "/file/" + name, {
        method: "POST",
        body: { testcase_id },
      })
        .then((res) => {
          return res.json();
        })
        .catch((err) => console.log(err));
    }
  } catch (err) {
    console.log(err);
  }
});

//일단 큐 없이 해보자.
app.get("/request_judge/:submission_id", async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.submission_id);
    //submission 디렉터리 만들고
    await fs.promises.mkdir(
      path.join(__dirname + "/submission", submission._id)
    );
    // 코드 불러오고
    await fetch(MEDIA_URL + "/code/" + submission.code, {
      method: "POST",
      body: { submission_id: submission._id },
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
    // 컴파일 하고 저장.
    //testcase 마다
    // 입력 파일 복사 한 다음
    // 실행 (표준 입력 주고 표준 출력 받아서 저장) pipe
    // 결과 분석 후 저장 및 전달
  } catch (err) {
    console.log(err);
  }
});

app.listen(3014, () => {
  console.log(`Example app listening on port ${3014}`);
});

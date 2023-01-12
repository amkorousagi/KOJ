const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require("cors");
const fetch = require("node-fetch");

const { Submission } = require("./model/submission.js");
const { Testcase } = require("./model/testcase.js");
const { id, pwd, dbName, ip, port, MEDIA_URL } = require("./config.js");
const { c, cpp, node, python, java } = require("compile-run");
const fs = require("fs");
const path = require("path");
const { Problem } = require("./model/problem.js");
import { copyFile } from "cp-file";
const { File } = require("./model/file.js");

const upload_testcase_file = multer({
  storage: multer.diskStorage({
    destination: async function (req, file, cb) {
      cb(null, "testcase/" + req.body.testcase_id + "/" + req.body.file_type);
    },
    filename: function (req, file, cb) {
      cb(null, req.body.filename);
    },
  }),
});

const upload_submission = multer({
  storage: multer.diskStorage({
    destination: async function (req, file, cb) {
      // submission?
      console.log("submission is ", req.body);
      cb(null, "submission/" + req.body.submission_id);
    },
    filename: function (req, file, cb) {
      // submission
      cb(null, req.body.filename); // code
    },
  }),
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post(
  "/upload_file",
  upload_testcase_file.array("file"),
  async (req, res) => {
    console.log("upload file");
    res.status(200).json({ success: true });
  }
);

app.post("/upload_code", upload_submission.array("file"), async (req, res) => {
  console.log("upload code");
  console.log(req.body);
  res.status(200).json({ success: true });
});

app.get("/build_judge_environment/:testcase_id", async (req, res) => {
  try {
    console.log(req.params.testcase_id);
    //디렉토리 먼저 만들기.
    await fs.promises.mkdir(
      path.join(__dirname + "/testcase", req.params.testcase_id)
    );
    await fs.promises.mkdir(
      path.join(__dirname + "/testcase/" + req.params.testcase_id, "input")
    );
    await fs.promises.mkdir(
      path.join(__dirname + "/testcase/" + req.params.testcase_id, "output")
    );
    const testcase = await Testcase.findById(req.params.testcase_id);
    console.log(testcase);
    // 표준입출력
    await fs.promises.writeFile(
      "testcase/" + testcase._id + "/koj_stdin.txt",
      testcase.input_text
    );
    await fs.promises.writeFile(
      "testcase/" + testcase._id + "/koj_stdout.txt",
      testcase.output_text
    );
    console.log("after std io");
    //file
    for (const name of testcase.input_file) {
      await fetch(MEDIA_URL + "/file/" + name, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testcase_id: testcase._id, file_type: "input" }),
      })
        .then((res) => {
          return res.json();
        })
        .catch((err) => console.log(err));
    }
    for (const name of testcase.output_file) {
      await fetch(MEDIA_URL + "/file/" + name, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testcase_id: testcase._id,
          file_type: "output",
        }),
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
    console.log(submission.code);
    await fs.promises.mkdir(
      path.join(__dirname + "/submission", req.params.submission_id)
    );
    // 코드 불러오고
    let code_name;
    for (const code_id of submission.code) {
      console.log(code_id);
      await fetch(MEDIA_URL + "/code/" + code_id, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submission_id: req.params.submission_id,
        }),
      })
        .then((res) => {
          console.log("media response");
          return res.json();
        })
        .then((data) => {
          code_name = data.name;
        })
        .catch((err) => console.log(err));
    }
    const problem = await Problem.findById(submission.problem);
    const testcases = await Testcase.find({ problem: problem._id });
    const success = [],
      stdout = [],
      stderr = [],
      exit_code = [],
      error_type = [],
      cpu_usage = [],
      memory_usage = [],
      signal = [],
      feedback = [],
      error = [];

    let agent;
    if (language == "c") {
      agent = c;
    } else if (language == "cpp") {
      agent = cpp;
    } else if (language == "java") {
      agent = java;
    } else if (language == "python") {
      agent = python;
    } else if (language == "node") {
      agent = node;
    } else {
      console.log("wrong language");
      return res.json({});
    }
    for (t of testcases) {
      try {
        const input_file = await File.findById(t.input_file[0]);
        await copyFile(
          __dirname +
            "/testcase/" +
            req.params.testcase_id +
            "/input/" +
            input_file.name,
          __dirname +
            "/submission/" +
            req.params.submission_id +
            "/" +
            input_file.name
        );
        const resultPromise = agent.runFile(
          __dirname +
            "/submission/" +
            req.params.submission_id +
            "/" +
            code_name,
          { stdin: t.input_text, timeout: 1000 }
        );
        const result = await resultPromise;
        console.log(result);
        if (t.output_file.length != 0) {
          const output_file = await File.findById(t.output_file[0]);
          const answer = fs.readFileSync(
            __dirname +
              "/testcase/" +
              req.params.testcase_id +
              "/output/" +
              output_file.name
          );
          const makedFile = fs.readFileSync(
            __dirname +
              "/submission/" +
              req.params.submission_id +
              "/" +
              output_file.name
          );
          if (answer.equals(makedFile)) {
            if (result.stdout == t.output_text) {
              success.append(true);
              feedback.append("good");
            } else {
              success.append(false);
              feedback.append("bad");
            }
          } else {
            success.append(false);
            feedback.append("bad");
          }
        } else {
          if (result.stdout == t.output_text) {
            success.append(true);
            feedback.append("good");
          } else {
            success.append(false);
            feedback.append("bad");
          }
        }

        stdout.append(result.stdout);
        stderr.append(result.stderr);
        exit_code.append(result.exitCode);
        error_type.append(result.errortype);
        cpu_usage.append(result.cpuUsage);
        memory_usage.append(result.memoryUsage);
        signal.append(result.signal);
      } catch (err) {
        console.log(err);
        error.append({
          testcase: t._id,
          testcase_name: t.title,
          error_stack: err.stack,
          error: err,
        });
      }
    }
    // 컴파일 하고 저장.
    //testcase 마다

    // 입력 파일 복사 한 다음
    // 실행 (표준 입력 주고 표준 출력 받아서 저장) pipe
    // 결과 분석 후 저장 및 전달
  } catch (err) {
    console.log(err);
  }

  return res.json({
    log,
    success,
    fail,
    result,
    output,
    feedback,
  });
});

mongoose
  .connect(`mongodb://${id}:${pwd}@${ip}:${port}/${dbName}`)
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(3014, () => {
      console.log(`Example app listening on port ${3014}`);
    });
  })
  .catch((err) => {
    console.log("error connecting to MongoDB:", err.message);
  });

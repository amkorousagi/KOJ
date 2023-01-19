import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import cors from "cors";
import fetch from "node-fetch";
import { c, cpp, node, python, java } from "compile-run";
import fs from "fs";
import path from "path";
import { copyFile } from "cp-file";

import Submission from "./model/submission.js";
import Testcase from "./model/testcase.js";
import { id, pwd, dbName, ip, port, MEDIA_URL } from "./config.js";
import Problem from "./model/problem.js";
import File from "./model/file.js";
import { exec, spawn, spawnSync } from "child_process";

const __dirname = path.resolve();

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
  const success = [],
    stdin = [],
    stdout = [],
    stderr = [],
    exit_code = [],
    error_type = [],
    cpu_usage = [],
    memory_usage = [],
    signal = [],
    feedback = [],
    error = [];
  try {
    const submission = await Submission.findById(req.params.submission_id);
    await Submission.findByIdAndUpdate(req.params.submission_id, {
      state: "doing (0%)",
    });
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
    //console.log(problem);
    let agent;
    if (submission.language == "c") {
      agent = c;
    } else if (submission.language == "cpp") {
      agent = cpp;
    } else if (submission.language == "java") {
      agent = java;
    } else if (submission.language == "python") {
      agent = python;
    } else if (submission.language == "node") {
      agent = node;
    } else {
      console.log("wrong language");
      return res.json({});
    }
    console.log("start testcase");
    let cnt = 0;
    for (const t of testcases) {
      try {
        cnt++;
        await Submission.findByIdAndUpdate(req.params.submission_id, {
          state: "doing (" + parseInt((cnt / t.length) * 100) + "%)",
        });
        if (t.input_file.length != 0) {
          const input_file = await File.findById(t.input_file[0]);
          await copyFile(
            path.join(
              __dirname + "/testcase/" + t._id + "/input/" + input_file.name
            ),
            path.join(
              __dirname +
                "/submission/" +
                req.params.submission_id +
                "/" +
                input_file.name
            )
          );
          console.log("copy");
        }

        const compile = exec("gcc -o code " + code_name, {
          cwd: path.join(__dirname + "/submission/" + req.params.submission_id),
        });

        await new Promise((resolve, reject) => {
          compile.on("close", (c) => {
            console.log("close with " + c);
            resolve();
          });
          compile.on("error", (c) => {
            console.log("error with " + c);
            reject();
          });
        });

        const cod = spawn(path.join("./code"), {
          cwd: path.join(__dirname + "/submission/" + req.params.submission_id),
          timeout: 1000,
        });
        cod.stdin.write(t.input_text);
        let result_output = "";
        cod.stdout.on("data", function (data) {
          data = data.toString();
          result_output += data;
        });
        let result_error = "";
        cod.stderr.on("data", function (data) {
          data = data.toString();
          result_error += data;
        });
        let result_exit_code = "";
        await new Promise((resolve, reject) => {
          cod.on("close", (c) => {
            result_exit_code = c;
            resolve();
          });
        });
        console.log({ result_output, result_error, result_exit_code });
        /*
        const resultPromise = agent.runFile(
          path.join(
            __dirname +
              "/submission/" +
              req.params.submission_id +
              "/" +
              code_name
          ),
          {
            stdin: t.input_text,
            timeout: 1000,
            cwd: path.join(
              __dirname + "/submission/" + req.params.submission_id
            ),
          }
        );
        */
        const result = {
          stdout: result_output,
          stderr: result_error,
          exit_code: result_exit_code,
        };
        console.log(result);
        if (t.output_file.length != 0) {
          const output_file = await File.findById(t.output_file[0]);
          console.log(output_file);
          if (
            fs.existsSync(
              path.join(
                __dirname +
                  "/submission/" +
                  req.params.submission_id +
                  "/" +
                  output_file.name
              )
            )
          ) {
            const answer = fs.readFileSync(
              path.join(
                __dirname + "/testcase/" + t._id + "/output/" + output_file.name
              )
            );
            const makedFile = fs.readFileSync(
              path.join(
                __dirname +
                  "/submission/" +
                  req.params.submission_id +
                  "/" +
                  output_file.name
              )
            );
            if (answer.equals(makedFile)) {
              if (result.stdout == t.output_text) {
                success.push(true);
                feedback.push("good");
              } else {
                success.push(false);
                feedback.push("bad");
              }
            } else {
              success.push(false);
              feedback.push("bad");
            }
          } else {
            success.push(false);
            feedback.push("no output file");
          }
        } else {
          if (result.stdout == t.output_text) {
            success.push(true);
            feedback.push("good");
          } else {
            success.push(false);
            feedback.push("bad");
          }
        }
        stdin.push(t.input_text);
        stdout.push(result.stdout);
        stderr.push(result.stderr);
        exit_code.push(result.exitCode);
        error_type.push(0);
        cpu_usage.push(0);
        memory_usage.push(0);
        signal.push(0);
        error.push(undefined);
      } catch (err) {
        console.log(err);
        success.push(false);
        feedback.push("error");
        stdout.push("");
        stderr.push("");
        exit_code.push("");
        error_type.push("");
        cpu_usage.push(0);
        memory_usage.push(0);
        signal.push(0);
        error.push({
          testcase: t._id,
          testcase_name: t.title,
          error_stack: err.stack,
          error: err,
        });
      }
    }
    await Submission.findByIdAndUpdate(req.params.submission_id, {
      state: "done",
    });
    // 컴파일 하고 저장.
    //testcase 마다

    // 입력 파일 복사 한 다음
    // 실행 (표준 입력 주고 표준 출력 받아서 저장) pipe
    // 결과 분석 후 저장 및 전달
  } catch (err) {
    console.log(err);
  }
  console.log({
    success,
    stdin,
    stdout,
    stderr,
    exit_code,
    error_type,
    cpu_usage,
    memory_usage,
    signal,
    feedback,
    error,
  });
  return res.json({
    success,
    stdin,
    stdout,
    stderr,
    exit_code,
    error_type,
    cpu_usage,
    memory_usage,
    signal,
    feedback,
    error,
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

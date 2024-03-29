import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import cors from "cors";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { copyFile } from "cp-file";

import Submission from "./model/submission.js";
import Testcase from "./model/testcase.js";
import { id, pwd, dbName, ip, port, MEDIA_URL } from "./config.js";
import Problem from "./model/problem.js";
import File from "./model/file.js";
import { exec, spawn, spawnSync } from "child_process";
import { PassThrough } from "stream";

import chardet from "chardet";
import iconv from "iconv-lite";

function errorHandler(cb) {
  return function (req, res, next) {
    cb(req, res, next).catch(next); // promise라서 .catch 가능
  };
}

function responseHandler(service) {
  return errorHandler(async (req, res, next) => {
    return await service(req, res, next);
  });
}

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
  responseHandler(async (req, res) => {
    console.log("upload file");
    res.status(200).json({ success: true });
  })
);

app.post(
  "/upload_code",
  upload_submission.array("file"),
  responseHandler(async (req, res) => {
    console.log("upload code");
    console.log(req.body);
    res.status(200).json({ success: true });
  })
);

app.get(
  "/build_judge_environment/:testcase_id",
  responseHandler(async (req, res) => {
    try {
      console.log(req.params.testcase_id);
      //있다면 지우기
      await fs.promises.rm(
        path.join(__dirname + "/testcase", req.params.testcase_id),
        { recursive: true, force: true }
      );
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
          body: JSON.stringify({
            testcase_id: testcase._id,
            file_type: "input",
          }),
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
      return res.json({ success: true });
    } catch (err) {
      console.log(err);
      return res.json({ success: false });
    }
  })
);

//일단 큐 없이 해보자.
app.get(
  "/request_judge/:submission_id",
  responseHandler(async (req, res) => {
    let success = [],
      stdin = [],
      stdout = [],
      stderr = [],
      actual_file = [],
      expected_file = [],
      exit_code = [],
      error_type = [],
      cpu_usage = [],
      memory_usage = [],
      signal = [],
      feedback = [],
      error = [];
    let process = "compile";
    const Nwords = [
      "fork",
      "exec",
      "popen",
      "shell",
      "bash",
      "socket",
      "sleep",
      "sys",
      "reboot",
      "eval",
      "sleep",
      "sh",
    ];
    try {
      const submission = await Submission.findById(req.params.submission_id);
      const entry = submission.entry;
      const problem = await Problem.findById(submission.problem);
      const trim = problem.trim === "false" ? false : true;
      await Submission.findByIdAndUpdate(req.params.submission_id, {
        state: "doing (0%)",
      });
      //submission 디렉터리 만들고
      console.log(submission);
      await fs.promises.rm(
        path.join(__dirname + "/submission", req.params.submission_id),
        { recursive: true, force: true }
      );
      await fs.promises.mkdir(
        path.join(__dirname + "/submission", req.params.submission_id)
      );
      // 코드 불러오고
      let code_names = [];
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
            code_names.push(data.name);
          })
          .catch((err) => console.log(err));
      }

      if (problem.problem_type === "result") {
        console.log(submission.result.trim());
        console.log(problem.result_answer.trim());
        // to do
        if (submission.result.trim() === problem.result_answer.trim()) {
          return res.json({
            success: [true],
            stdin: [""],
            stdout: [submission.result.trim()],
            stderr: [""],
            exit_code: [""],
            error_type: [""],
            cpu_usage: [""],
            memory_usage: [""],
            signal: [""],
            feedback: [""],
            error: [""],
          });
        } else {
          return res.json({
            success: [false],
            stdin: [""],
            stdout: [submission.result.trim()],
            stderr: [""],
            exit_code: [""],
            error_type: [""],
            cpu_usage: [""],
            memory_usage: [""],
            signal: [""],
            feedback: [""],
            error: [""],
          });
        }
      }

      let language;
      if (submission.language == "c") {
        language = "c";
      } else if (submission.language == "cpp") {
        language = "cpp";
      } else if (submission.language == "java") {
        language = "java";
      } else if (submission.language == "python") {
        language = "python";
      } else if (submission.language == "node") {
        language = "node";
      } else {
        console.log("wrong language");
        return res.json({
          success: [false],
          stdin: [""],
          stdout: [""],
          stderr: ["wrong language"],
          exit_code: [""],
          error_type: [""],
          cpu_usage: [""],
          memory_usage: [""],
          signal: [""],
          feedback: [""],
          error: [""],
        });
      }

      if (
        problem.problem_type === "blank" ||
        (problem.problem_type === "solve" &&
          code_names.length === 0 &&
          submission.blank.length !== 0)
      ) {
        if (problem.problem_type === "blank") {
          language = problem.blank_language;
        }
        //replace blank to string
        let code_string = problem.blank;
        for (const b of submission.blank) {
          code_string = code_string.replace("#BLANK#", b);
        }

        //check Nwords
        for (const nword of Nwords) {
          //console.log(nword);
          if (code_string.includes(nword)) {
            //console.log("catch nword");
            return res.json({
              success: [false],
              stdin: [""],
              stdout: [""],
              stderr: [
                "do not use keywords that can cause problems on server : " +
                  nword,
              ],
              exit_code: [""],
              error_type: [""],
              cpu_usage: [""],
              memory_usage: [""],
              signal: [""],
              feedback: [""],
              error: [""],
            });
          }
        }

        //save string to file and add code_names
        if (language == "c") {
          await fs.promises.writeFile(
            path.join(
              __dirname + "/submission/" + req.params.submission_id + "/main.c"
            ),
            code_string
          );
          code_names.push("main.c");
        } else if (language == "cpp") {
          await fs.promises.writeFile(
            path.join(
              __dirname +
                "/submission/" +
                req.params.submission_id +
                "/main.cpp"
            ),
            code_string
          );
          code_names.push("main.cpp");
        } else if (language == "java") {
          await fs.promises.writeFile(
            path.join(
              __dirname +
                "/submission/" +
                req.params.submission_id +
                "/Main.java"
            ),
            code_string
          );
          code_names.push("Main.java");
        } else if (language == "python") {
          await fs.promises.writeFile(
            path.join(
              __dirname + "/submission/" + req.params.submission_id + "/main.py"
            ),
            code_string
          );
          code_names.push("main.py");
        } else if (language == "node") {
          await fs.promises.writeFile(
            path.join(
              __dirname + "/submission/" + req.params.submission_id + "/main.js"
            ),
            code_string
          );
          code_names.push("main.js");
        }
      }
      const testcases = await Testcase.find({ problem: problem._id });
      //console.log(problem);

      console.log("start compile");

      try {
        let compile;
        process = "compile";
        console.log("im compile");
        //check nword
        for (const code_name of code_names) {
          console.log({ code_name });
          const code_check_string = fs.readFileSync(
            path.join(
              __dirname +
                "/submission/" +
                req.params.submission_id +
                "/" +
                code_name
            )
          );
          const detectedEncoding = chardet.detect(code_check_string);
          console.log(detectedEncoding);
          if (detectedEncoding !== "UTF-8") {
            let text;
            console.log("compare " + (detectedEncoding === "ISO-8859-1"));
            console.log(detectedEncoding);
            console.log("ISO-8859-1");
            if (detectedEncoding === "ISO-8859-1") {
              text = iconv.decode(code_check_string, "CP949");
            } else {
              text = iconv.decode(code_check_string, detectedEncoding);
            }
            fs.writeFileSync(
              path.join(
                __dirname +
                  "/submission/" +
                  req.params.submission_id +
                  "/" +
                  code_name
              ),
              text,
              "utf-8"
            );
          }
          for (const nword of Nwords) {
            if (code_check_string.includes(nword)) {
              return res.json({
                success: [false],
                stdin: [""],
                stdout: [""],
                stderr: [
                  "do not use keywords that can cause problems on server : " +
                    nword,
                ],
                exit_code: [""],
                error_type: [""],
                cpu_usage: [""],
                memory_usage: [""],
                signal: [""],
                feedback: [""],
                error: [""],
              });
            }
          }
        }
        console.log("ccc");

        if (language == "c") {
          let code_str = "";
          for (const code_name of code_names) {
            code_str += code_name + " ";
          }
          compile = exec("gcc -std=c99 " + code_str + " -lm -o code", {
            cwd: path.join(
              __dirname + "/submission/" + req.params.submission_id
            ),
            timeout: 5000,
          });
          let ro, re;
          compile.stdout.on("data", function (data) {
            data = data.toString();
            ro += data;
          });
          compile.stderr.on("data", function (data) {
            data = data.toString();
            re += data;
          });
          let rc;
          await new Promise((resolve, reject) => {
            compile.on("exit", (c) => {
              console.log("close with " + c);
              rc = c;
              resolve();
            });
            compile.on("error", (c) => {
              console.log("error with " + c);
              reject();
              //resolve();
            });
          });
          console.log("ro", ro);
          console.log("re", re);
          if (rc !== 0) {
            // 컴파일 에러
            exit_code.push(rc);
            error.push(re);
            feedback.push("compile error");
            throw new Error("compile error");
          }
        } else if (language == "cpp") {
          let code_str = "";
          for (const code_name of code_names) {
            code_str += code_name + " ";
          }
          compile = exec("g++ -std=c++17 " + code_str + " -lm -o code", {
            cwd: path.join(
              __dirname + "/submission/" + req.params.submission_id
            ),
            timeout: 5000,
          });
          let ro, re;
          compile.stdout.on("data", function (data) {
            data = data.toString();
            ro += data;
          });
          compile.stderr.on("data", function (data) {
            data = data.toString();
            re += data;
          });
          let rc;
          await new Promise((resolve, reject) => {
            compile.on("exit", (c) => {
              console.log("close with " + c);
              rc = c;
              resolve();
            });
            compile.on("error", (c) => {
              console.log("error with " + c);
              reject();
            });
          });
          console.log("ro", ro);
          console.log("re", re);
          if (rc !== 0) {
            // 컴파일 에러
            exit_code.push(rc);
            error.push(re);
            feedback.push("compile error");
            throw new Error("compile error");
          }
        } else if (language == "java") {
          compile = exec("javac -cp . ./*.java", {
            cwd: path.join(
              __dirname + "/submission/" + req.params.submission_id
            ),
            timeout: 5000,
          });
          let ro, re;
          compile.stdout.on("data", function (data) {
            data = data.toString();
            ro += data;
          });
          compile.stderr.on("data", function (data) {
            data = data.toString();
            re += data;
          });
          let rc;
          await new Promise((resolve, reject) => {
            compile.on("exit", (c) => {
              console.log("close with " + c);
              rc = c;
              resolve();
            });
            compile.on("error", (c) => {
              console.log("error with " + c);
              reject();
            });
          });
          console.log("ro", ro);
          console.log("re", re);
          if (rc !== 0) {
            // 컴파일 에러
            exit_code.push(rc);
            error.push(re);
            feedback.push("compile error");
            throw new Error("compile error");
          }
        } else if (language == "python") {
          // do not need
        } else if (language == "node") {
          // do not need
        }
      } catch (err) {
        success = [false];
        stdin = [""];
        stdout = [""];
        stderr = [""];
        error_type = ["컴파일 에러"];
        cpu_usage = [""];
        memory_usage = [""];
        signal = [""];
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
      }

      console.log("start testcase");
      let cnt = 0;
      for (const t of testcases) {
        let result_output = "";
        let result_error = "";
        let result_exit_code = "";
        let result_signal = "";
        let error_detail = "";
        let error_type_detail = "";
        try {
          cnt++;
          await Submission.findByIdAndUpdate(req.params.submission_id, {
            state: "doing (" + parseInt((cnt / testcases.length) * 100) + "%)",
          });
          console.log(
            "doing (" + parseInt((cnt / testcases.length) * 100) + "%)"
          );
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
          console.log(path.join("./code"));
          let cod;
          process = "runtime";
          //undefined 인지도 검사하기
          const args =
            (t.arg_text !== "") | t.arg_text ? t.arg_text.split(" ") : [];
          if (language == "c") {
            cod = spawn("./code", [...args], {
              cwd: path.join(
                __dirname + "/submission/" + req.params.submission_id
              ),
              execArgv: "--max-old-space-size=1024",
            });
          } else if (language == "cpp") {
            cod = spawn("./code", [...args], {
              cwd: path.join(
                __dirname + "/submission/" + req.params.submission_id
              ),
              execArgv: "--max-old-space-size=1024",
            });
          } else if (language == "java") {
            const entry_str =
              code_names.length > 1
                ? entry.split(".")[0]
                : code_names[0].split(".")[0];
            cod = spawn("java", [entry_str, ...args], {
              cwd: path.join(
                __dirname + "/submission/" + req.params.submission_id
              ),
              execArgv: "--max-old-space-size=1024",
            });
          } else if (language == "python") {
            const entry_str = code_names.length > 1 ? entry : code_names[0];
            cod = spawn("python3", [entry_str, ...args], {
              cwd: path.join(
                __dirname + "/submission/" + req.params.submission_id
              ),
              execArgv: "--max-old-space-size=1024",
            });
          } else if (language == "node") {
            const entry_str = code_names.length > 1 ? entry : code_names[0];
            cod = spawn("node", [entry_str, ...args], {
              cwd: path.join(
                __dirname + "/submission/" + req.params.submission_id
              ),
              execArgv: "--max-old-space-size=1024",
            });
          }
          setTimeout(
            () => {
              error_type_detail = "시간 초과";
              error_detail =
                "timeout " +
                (problem.execution_time_limit
                  ? problem.execution_time_limit
                  : 1000) +
                "ms";
              cod.kill("SIGTERM");
            },
            problem.execution_time_limit ? problem.execution_time_limit : 1000
          );
          console.log({ stdin: t.input_text.trim() + "\n" });
          //const input = new PassThrough();
          //input.pipe(cod.stdin);
          //input.write(t.input_text.trim() + "\n");
          //input.end();
          cod.stdin.write(t.input_text.trim() + "\n");
          const max_len = 10000;
          result_output = "";
          result_error = "";
          result_exit_code = "";
          cod.stdout.on("data", function (data) {
            data = data.toString();
            result_output += data;
            if (result_output.length > max_len) {
              error_type_detail = "출력 초과";
              error_detail = "too many output";
              cod.kill("SIGTERM");
            }
          });

          cod.stderr.on("data", function (data) {
            data = data.toString();
            result_error += data;
          });
          cod.on("error", (err) => {
            console.log(err.code);
            console.log("catch error", err);
          });

          await new Promise((resolve, reject) => {
            cod.on("exit", (c, sg) => {
              result_exit_code = c;
              result_signal = sg;
              resolve();
            });
          });

          console.log({
            result_output,
            result_error,
            result_exit_code,
            result_signal,
          });
          /*
          if (result_exit_code !== 0) {
            throw new Error("runtime error");
          }
          */
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
          console.log({ t });
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
              ) &&
              fs.statSync(
                path.join(
                  __dirname +
                    "/submission/" +
                    req.params.submission_id +
                    "/" +
                    output_file.name
                )
              ).size /
                (1024 * 1024) <
                5
            ) {
              let answer;
              let makedFile;
              if (output_file.extension === ".txt") {
                answer = fs.readFileSync(
                  path.join(
                    __dirname +
                      "/testcase/" +
                      t._id +
                      "/output/" +
                      output_file.name
                  ),
                  { encoding: "utf8" }
                );
                makedFile = fs.readFileSync(
                  path.join(
                    __dirname +
                      "/submission/" +
                      req.params.submission_id +
                      "/" +
                      output_file.name
                  ),
                  { encoding: "utf8" }
                );
                actual_file.push(
                  makedFile
                    .replace(/\r/g, "")
                    .replace(/\r\t/g, "\t")
                    .replace(/(?:\r\n|\r|\n)/g, "\r\n")
                    .trim()
                    .split("\r\n")
                    .map((line) => line.trim())
                    .join("\r\n")
                );
                expected_file.push(
                  answer
                    .replace(/\r/g, "")
                    .replace(/\r\t/g, "\t")
                    .replace(/(?:\r\n|\r|\n)/g, "\r\n")
                    .trim()
                    .split("\r\n")
                    .map((line) => line.trim())
                    .join("\r\n")
                );
                console.log(typeof answer);
                console.log({
                  answer: answer.trim().replace(/(?:\r\n|\r|\n)/g, "\r\n"),
                  makedFile: makedFile
                    .trim()
                    .replace(/(?:\r\n|\r|\n)/g, "\r\n"),
                });
                if (
                  answer
                    .replace(/\r/g, "")
                    .replace(/\r\t/g, "\t")
                    .replace(/(?:\r\n|\r|\n)/g, "\r\n")
                    .trim()
                    .split("\r\n")
                    .map((line) => line.trim())
                    .join("\r\n") ==
                  makedFile
                    .replace(/\r/g, "")
                    .replace(/\r\t/g, "\t")
                    .replace(/(?:\r\n|\r|\n)/g, "\r\n")
                    .trim()
                    .split("\r\n")
                    .map((line) => line.trim())
                    .join("\r\n")
                ) {
                  if (
                    result.stdout
                      .replace(/\r/g, "")
                      .replace(/\r\t/g, "\t")
                      .replace(/(?:\r\n|\r|\n)/g, "\r\n")
                      .trim()
                      .split("\r\n")
                      .map((line) => line.trim())
                      .join("\r\n") ==
                    t.output_text
                      .replace(/\r/g, "")
                      .replace(/\r\t/g, "\t")
                      .replace(/(?:\r\n|\r|\n)/g, "\r\n")
                      .trim()
                      .split("\r\n")
                      .map((line) => line.trim())
                      .join("\r\n")
                  ) {
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
                answer = fs.readFileSync(
                  path.join(
                    __dirname +
                      "/testcase/" +
                      t._id +
                      "/output/" +
                      output_file.name
                  )
                );
                makedFile = fs.readFileSync(
                  path.join(
                    __dirname +
                      "/submission/" +
                      req.params.submission_id +
                      "/" +
                      output_file.name
                  )
                );
                actual_file.push(makedFile.toString("utf-8"));
                expected_file.push(answer.toString("utf-8"));
                console.log(typeof answer);
                console.log({
                  answer,
                  makedFile,
                });
                if (answer.equals(makedFile)) {
                  if (
                    result.stdout
                      .replace(/\r/g, "")
                      .replace(/\r\t/g, "\t")
                      .replace(/(?:\r\n|\r|\n)/g, "\r\n")
                      .trim()
                      .split("\r\n")
                      .map((line) => line.trim())
                      .join("\r\n") ==
                    t.output_text
                      .replace(/\r/g, "")
                      .replace(/\r\t/g, "\t")
                      .replace(/(?:\r\n|\r|\n)/g, "\r\n")
                      .trim()
                      .split("\r\n")
                      .map((line) => line.trim())
                      .join("\r\n")
                  ) {
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
              }
            } else {
              success.push(false);
              feedback.push("no output file");
            }
          } else {
            console.log({
              r: result.stdout
                .replace(/(?:\r\n|\r|\n)/g, "\r\n")
                .trim()
                .split("\r\n")
                .map((line) => line.trim())
                .join("\r\n"),
            });
            console.log({
              t: t.output_text
                .replace(/(?:\r\n|\r|\n)/g, "\r\n")
                .trim()
                .split("\r\n")
                .map((line) => line.trim())
                .join("\r\n"),
            });
            if (
              trim
                ? result.stdout
                    .replace(/\r/g, "")
                    .replace(/\r\t/g, "\t")
                    .replace(/(?:\r\n|\r|\n)/g, "\r\n")
                    .trim()
                    .split("\r\n")
                    .map((line) => line.trim())
                    .join("\r\n") ==
                  t.output_text
                    .replace(/\r/g, "")
                    .replace(/\r\t/g, "\t")
                    .replace(/(?:\r\n|\r|\n)/g, "\r\n")
                    .trim()
                    .split("\r\n")
                    .map((line) => line.trim())
                    .join("\r\n")
                : result.stdout.replace(/(?:\r\n|\r|\n)/g, "\r\n").trimEnd() ==
                  t.output_text.replace(/(?:\r\n|\r|\n)/g, "\r\n").trimEnd()
            ) {
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
          exit_code.push(result.exit_code);
          error_type.push("");
          cpu_usage.push("");
          memory_usage.push("");
          signal.push(result_signal);
          error.push("");
        } catch (err) {
          console.log(err);
          success.push(false);
          feedback.push("runtime error");

          stdout.push(result_output);
          stderr.push(result_error);
          exit_code.push(result_exit_code);
          error_type.push(
            error_type_detail === "" ? "런타임 에러" : error_type_detail
          );
          cpu_usage.push("");
          memory_usage.push("");
          signal.push(result_signal);
          error.push(error_detail === "" ? "runtime error" : error_detail);
        }
      }
      // 컴파일 하고 저장.
      //testcase 마다

      // 입력 파일 복사 한 다음
      // 실행 (표준 입력 주고 표준 출력 받아서 저장) pipe
      // 결과 분석 후 저장 및 전달
    } catch (err) {
      console.log(err);
      console.log("unknown error");
      success = [false];
      stdin = [""];
      stdout = [""];
      stderr = [""];
      exit_code = [""];
      cpu_usage = [""];
      memory_usage = [""];
      signal = [""];
      error = [err];
      error_type = ["알수없는 오류"];
    }

    console.log({
      success,
      stdin,
      stdout,
      stderr,
      actual_file,
      expected_file,
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
      actual_file,
      expected_file,
      exit_code,
      error_type,
      cpu_usage,
      memory_usage,
      signal,
      feedback,
      error,
    });
  })
);
const handlingError = (err, req, res, next) => {
  let httpCode = 500;
  let data = {
    success: false,
    data: {},
    error: err.name,
    message: err.message,
    detail: err.stack,
  };
  console.log(err.stack);
  res.status(httpCode).json(data);
};

const notFoundRouterError = (req, res) => {
  res.status(404).json({
    success: false,
    data: {},
    error: "invalid url",
    message: "",
    detail: "",
  });
};
app.use(handlingError);
app.all("*", notFoundRouterError);

mongoose
  .connect(`mongodb://${id}:${pwd}@${ip}:${port}/${dbName}`, {
    authSource: "admin",
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(3014, () => {
      console.log(`Example app listening on port ${3014}`);
    });
  })
  .catch((err) => {
    console.log("error connecting to MongoDB:", err.message);
  });

process.on("uncaughtException", (exception) => {
  console.log(exception.stack);
});
process.once("SIGUSR2", function () {
  gracefulShutdown(function () {
    process.kill(process.pid, "SIGUSR2");
  });
});

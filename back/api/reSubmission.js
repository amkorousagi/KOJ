import express from "express";
import { initSubmission, updateSubmission } from "../controller/submission";
import { responseHandler } from "../lib/common";
import fetch from "node-fetch";
import { KOJ_URL } from "../config";
import User from "../model/user";
import {
  calcScore,
  createScore,
  updateScore,
} from "../controller/problem_score";

const reSubmissionRoute = express();

reSubmissionRoute.post(
  "/",
  responseHandler(async (req) => {
    const { submissions } = req.body;
    const updateScoreResult = [];
    let last_score;
    for await (const submission of submissions) {
      console.log(submission);
      if (submission === undefined) {
        throw new Error("no submission id");
      }
      let {
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
      } = {};
      const fetch_result = await fetch(
        KOJ_URL + "/request_judge/" + submission,
        {
          method: "GET",
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          success = data.success;
          stdin = data.stdin;
          stdout = data.stdout;
          stderr = data.stderr;
          exit_code = data.exit_code;
          error_type = data.error_type;
          cpu_usage = data.cpu_usage;
          memory_usage = data.memory_usage;
          signal = data.signal;
          feedback = data.feedback;
          error = data.error;
          return true;
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
      if (fetch_result == false) {
      }
      const updated_submission = await updateSubmission({
        submission_id: submission,
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
      console.log(updated_submission.success);
      const score = await calcScore({
        problem: updated_submission.problem,
        success: updated_submission.success,
      });
      last_score = score;
      const problem_score = await createScore({
        problem: updated_submission.problem,
        student: updated_submission.student,
        submission: submission._id,
      });
      const tempResult = await updateScore({
        problem_score_id: problem_score._id,
        score,
      });
      updateScoreResult.push(tempResult);
    }
    return { result: updateScoreResult, score: last_score };
  })
);

export default reSubmissionRoute;

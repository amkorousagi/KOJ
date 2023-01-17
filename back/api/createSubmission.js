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

const createSubmissionRoute = express();

createSubmissionRoute.post(
  "/",
  responseHandler(async (req) => {
    const { problem, code, language } = req.body;

    const submission = await initSubmission({
      problem,
      student: req.user._id,
      code,
      language,
    });
    const problem_score = await createScore({ problem, student: req.user._id });
    // 유효성 검증 , id.. problem_type

    // koj 채점 queue에 보냄

    let {
      success,
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
    await fetch(KOJ_URL + "/request_judge/" + submission._id, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        success = data.success;
        stdout = data.stdout;
        stderr = data.stderr;
        exit_code = data.exit_code;
        error_type = data.error_type;
        cpu_usage = data.cpu_usage;
        memory_usage = data.memory_usage;
        signal = data.signal;
        feedback = data.feedback;
        error = data.error;
        return;
      })
      .catch((err) => {
        console.log(err);
      });

    const updated_submission = await updateSubmission({
      submission_id: submission._id,
      success,
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
    const score = await calcScore({
      problem,
      success: updated_submission.success,
    });
    return await updateScore({
      problem_score_id: problem_score._id,
      score,
    });
  })
);

export default createSubmissionRoute;

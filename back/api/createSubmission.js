import express from "express";
import { initSubmission, updateSubmission } from "../controller/submission";
import { responseHandler } from "../lib/common";
import fetch from "node-fetch";
import { KOJ_URL } from "../config";
import User from "../model/user";

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

    // 유효성 검증 , id.. problem_type

    // koj 채점 queue에 보냄
    const judge = await fetch(KOJ_URL + "/request_judge/" + submission._id, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });

    const { log, success, fail, result, output, feedback } = judge;

    return await updateSubmission({
      submission_id: submission._id,
      log,
      success,
      fail,
      result,
      output,
      feedback,
    });
  })
);

export default createSubmissionRoute;

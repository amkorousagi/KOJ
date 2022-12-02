import express from "express";
import { createSubmission } from "../controller/submission";
import { responseHandler } from "../lib/common";

const createSubmissionRoute = express();

createSubmissionRoute.post(
  "/",
  responseHandler(async (req) => {
    const { problem, code, language } = req.body;

    // 유효성 검증 , id.. problem_type

    // koj 채점 queue에 보냄

    return await createSubmission({
      problem,
      student: req.user._id,
      code,
      language,
    });
  })
);

export default createSubmissionRoute;

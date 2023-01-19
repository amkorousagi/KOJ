import express from "express";
import { readSubmission, readSubmissionById } from "../controller/submission";
import { responseHandler } from "../lib/common";

const readSubmissionRoute = express();

readSubmissionRoute.post(
  "/",
  responseHandler(async (req) => {
    const { problem, student } = req.body;

    const { id } = req.body;
    if (id) {
      return await readSubmissionById({ id });
    }

    // 유효성 검증 , id.. problem_type

    // koj 채점 queue에 보냄

    return await readSubmission({
      problem,
      student,
    });
  })
);

export default readSubmissionRoute;

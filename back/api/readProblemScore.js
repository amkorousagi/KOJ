import express from "express";
import { readProblemScore } from "../controller/problem_score";
import { responseHandler } from "../lib/common";

const readProblemScoreRoute = express();

readProblemScoreRoute.post(
  "/",
  responseHandler(async (req) => {
    const { problem, student } = req.body;

    // 유효성 검증 , id.. problem_type

    // koj 채점 queue에 보냄
    return await readProblemScore({ problem, student });
  })
);

export default readProblemScoreRoute;

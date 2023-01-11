import express from "express";
import { createProblem } from "../controller/problem";
import { responseHandler } from "../lib/common";

const createProblemRoute = express();

createProblemRoute.post(
  "/",
  responseHandler(async (req) => {
    const {
      practice,
      problem_type,
      title,
      description,
      score,
      pdf,
      result_answer,
    } = req.body;

    // 유효성 검증 , id.. problem_type

    return await createProblem({
      practice,
      problem_type,
      title,
      description,
      score,
      pdf,
      result_answer,
    });
  })
);

export default createProblemRoute;

import express from "express";
import { updateProblem } from "../controller/problem";
import { responseHandler } from "../lib/common";

const updateProblemRoute = express();

updateProblemRoute.post(
  "/",
  responseHandler(async (req) => {
    const {
      problem,
      problem_type,
      title,
      description,
      score,
      pdf,
      result_answer,
      blank,
    } = req.body;

    // 유효성 검증 , id.. problem_type

    return await updateProblem({
      problem,
      problem_type,
      title,
      description,
      score,
      pdf,
      result_answer,
      blank,
    });
  })
);

export default updateProblemRoute;

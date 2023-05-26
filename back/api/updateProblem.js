import express from "express";
import { checkOwner, updateProblem } from "../controller/problem";
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
      blank_language,
      execution_time_limit,
    } = req.body;

    // 유효성 검증 , id.. problem_type
    await checkOwner({ problem, owner: req.user._id });
    return await updateProblem({
      problem,
      problem_type,
      title,
      description,
      score,
      pdf,
      result_answer,
      blank,
      blank_language,
      execution_time_limit,
    });
  })
);

export default updateProblemRoute;

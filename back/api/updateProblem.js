import express from "express";
import { checkOwner, updateProblem } from "../controller/problem";
import { responseHandler } from "../lib/common";

const updateProblemRoute = express();

updateProblemRoute.post(
  "/",
  responseHandler(async (req) => {
    const {
      problem = null,
      problem_type = null,
      title = null,
      description = null,
      score = null,
      pdf = null,
      result_answer = null,
      blank = null,
      blank_language = null,
      execution_time_limit = null,
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

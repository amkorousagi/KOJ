import express from "express";
import { checkOwner, createProblem } from "../controller/problem";
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
      execution_time_limit,
      blank,
    } = req.body;

    // 유효성 검증 , id.. problem_type
    await checkOwner({ practice, owner: req.user._id });
    return await createProblem({
      practice,
      problem_type,
      title,
      description,
      score,
      pdf,
      result_answer,
      execution_time_limit,
      blank,
    });
  })
);

export default createProblemRoute;

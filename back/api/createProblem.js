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
      blank_answer,
      result_answer,
      input_text,
      output_text,
      input_file,
      output_file,
    } = req.body;

    // 유효성 검증 , id.. problem_type

    return await createProblem({
      practice,
      problem_type,
      title,
      description,
      score,
      pdf,
      blank_answer,
      result_answer,
      input_text,
      output_text,
      input_file,
      output_file,
    });
  })
);

export default createProblemRoute;

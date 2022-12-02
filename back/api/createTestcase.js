import express from "express";
import { createTestcase } from "../controller/testcase";
import { responseHandler } from "../lib/common";

const createTestcaseRoute = express();

createTestcaseRoute.post(
  "/",
  responseHandler(async (req) => {
    const {
      problem,
      score,
      hidden,
      input_text,
      output_text,
      input_file,
      output_file,
    } = req.body;

    // 유효성 검증 , id.. problem_type

    return await createTestcase({
      problem,
      score,
      hidden,
      input_text,
      output_text,
      input_file,
      output_file,
    });
  })
);

export default createTestcaseRoute;

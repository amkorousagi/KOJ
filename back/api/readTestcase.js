import express from "express";
import { readTestcase } from "../controller/testcase";
import { responseHandler } from "../lib/common";

const readTestcaseRoute = express();

readTestcaseRoute.post(
  "/",
  responseHandler(async (req) => {
    const { problem } = req.body;

    // 유효성 검증 , id.. problem_type

    return await readTestcase({
      problem,
      user_type: req.user.user_type,
    });
  })
);

export default readTestcaseRoute;

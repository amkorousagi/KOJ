import express from "express";
import { deleteTestcase } from "../controller/testcase";
import { responseHandler } from "../lib/common";

const deleteTestcaseRoute = express();

deleteTestcaseRoute.post(
  "/",
  responseHandler(async (req) => {
    const { testcase } = req.body;

    // 유효성 검증 , id.. problem_type

    return await deleteTestcase({
      testcase,
    });
  })
);

export default deleteTestcaseRoute;

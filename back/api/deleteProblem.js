import express from "express";
import { deleteProblem } from "../controller/problem";
import { responseHandler } from "../lib/common";

const deleteProblemRoute = express();

deleteProblemRoute.post(
  "/",
  responseHandler(async (req) => {
    const { problem } = req.body;

    // 유효성 검증 , id.. problem_type

    return await deleteProblem({
      problem,
    });
  })
);

export default deleteProblemRoute;

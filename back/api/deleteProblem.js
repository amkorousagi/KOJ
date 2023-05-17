import express from "express";
import { checkOwner, deleteProblem } from "../controller/problem";
import { responseHandler } from "../lib/common";

const deleteProblemRoute = express();

deleteProblemRoute.post(
  "/",
  responseHandler(async (req) => {
    const { problem } = req.body;

    // 유효성 검증 , id.. problem_type
    await checkOwner({ problem, owner: req.user._id });
    return await deleteProblem({
      problem,
    });
  })
);

export default deleteProblemRoute;

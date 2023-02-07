import express from "express";
import { readDashScore } from "../controller/dashscore";
import { responseHandler } from "../lib/common";

const readDashScoreRoute = express();

readDashScoreRoute.post(
  "/",
  responseHandler(async (req) => {
    const { lecture, practice } = req.body;

    // 유효성 검증 , id..

    return await readDashScore({ lecture, practice });
  })
);

export default readDashScoreRoute;

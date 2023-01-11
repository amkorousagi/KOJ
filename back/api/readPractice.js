import express from "express";
import { readPractice } from "../controller/practice";
import { responseHandler } from "../lib/common";

const readPracticeRoute = express();

readPracticeRoute.post(
  "/",
  responseHandler(async (req) => {
    const { lecture } = req.body;
    // 유효성 검증 , id..
    return await readPractice({ lecture });
  })
);

export default readPracticeRoute;

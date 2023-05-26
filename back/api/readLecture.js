import express from "express";
import { readLecture } from "../controller/lecture";
import { responseHandler } from "../lib/common";

const readLectureRoute = express();

readLectureRoute.post(
  "/",
  responseHandler(async (req) => {
    const { lecturer, student } = req.body;
    console.log(req.body);
    // 유효성 검증 , id..

    return await readLecture({ lecturer, student });
  })
);

export default readLectureRoute;

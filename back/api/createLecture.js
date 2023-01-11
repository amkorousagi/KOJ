import express from "express";
import { createLecture } from "../controller/lecture";
import { responseHandler } from "../lib/common";

const createLectureRoute = express();

createLectureRoute.post(
  "/",
  responseHandler(async (req) => {
    const { lecturer, title, semester } = req.body;
    console.log(req.body);
    // 유효성 검증 , id..

    return await createLecture({ lecturer, title, semester });
  })
);

export default createLectureRoute;

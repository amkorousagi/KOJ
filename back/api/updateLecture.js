import express from "express";
import { updateLecture } from "../controller/lecture";
import { responseHandler } from "../lib/common";

const updateLectureRoute = express();

updateLectureRoute.post(
  "/",
  responseHandler(async (req) => {
    const { lecture, title, semester } = req.body;
    console.log(req.body);
    // 유효성 검증 , id..

    return await updateLecture({ lecture, title, semester });
  })
);

export default updateLectureRoute;

import express from "express";
import { updateLecture, checkOwner } from "../controller/lecture";
import { responseHandler } from "../lib/common";

const updateLectureRoute = express();

updateLectureRoute.post(
  "/",
  responseHandler(async (req) => {
    const { lecture, title, semester } = req.body;
    console.log(req.body);
    // 유효성 검증 , id..
    await checkOwner({ lecture, owner: req.user._id });
    return await updateLecture({ lecture, title, semester });
  })
);

export default updateLectureRoute;

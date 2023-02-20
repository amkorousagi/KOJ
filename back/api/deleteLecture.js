import express from "express";
import { deleteLecture } from "../controller/lecture";
import { responseHandler } from "../lib/common";

const deleteLectureRoute = express();

deleteLectureRoute.post(
  "/",
  responseHandler(async (req) => {
    const { lecture } = req.body;
    console.log(req.body);
    // 유효성 검증 , id..

    return await deleteLecture({ lecture });
  })
);

export default deleteLectureRoute;

import express from "express";
import { checkOwner, createPractice } from "../controller/practice";
import { responseHandler } from "../lib/common";

const createPracticeRoute = express();

createPracticeRoute.post(
  "/",
  responseHandler(async (req) => {
    const { lecture, title, start_date, end_date } = req.body;

    // 유효성 검증 , id..
    await checkOwner({ lecture, owner: req.user._id });
    return await createPractice({ lecture, title, start_date, end_date });
  })
);

export default createPracticeRoute;

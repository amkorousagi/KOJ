import express from "express";
import { checkOwner, updatePractice } from "../controller/practice";
import { responseHandler } from "../lib/common";

const updatePracticeRoute = express();

updatePracticeRoute.post(
  "/",
  responseHandler(async (req) => {
    const { practice, title, start_date, end_date } = req.body;

    // 유효성 검증 , id..
    await checkOwner({ practice, owner: req.user_id });
    return await updatePractice({ practice, title, start_date, end_date });
  })
);

export default updatePracticeRoute;

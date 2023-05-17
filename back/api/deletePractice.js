import express from "express";
import { checkOwner, deletePractice } from "../controller/practice";
import { responseHandler } from "../lib/common";

const deletePracticeRoute = express();

deletePracticeRoute.post(
  "/",
  responseHandler(async (req) => {
    const { practice } = req.body;

    // 유효성 검증 , id..
    await checkOwner({ practice, owner: req.user._id });
    return await deletePractice({ practice });
  })
);

export default deletePracticeRoute;

import express from "express";
import { deletePractice } from "../controller/practice";
import { responseHandler } from "../lib/common";

const deletePracticeRoute = express();

deletePracticeRoute.post(
  "/",
  responseHandler(async (req) => {
    const { practice } = req.body;

    // 유효성 검증 , id..

    return await deletePractice({ practice });
  })
);

export default deletePracticeRoute;

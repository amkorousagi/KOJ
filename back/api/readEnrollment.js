import express from "express";
import { readEnrollent } from "../controller/enrollement";
import { responseHandler } from "../lib/common";

const readEnrollmentRoute = express();

readEnrollmentRoute.post(
  "/",
  responseHandler(async (req) => {
    const { lecture, student } = req.body;

    // 유효성 검증 , id..

    return await readEnrollent({ lecture, student });
  })
);

export default readEnrollmentRoute;

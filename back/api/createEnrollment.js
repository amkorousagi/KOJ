import express from "express";
import { createEnrollments } from "../controller/enrollement";
import { responseHandler } from "../lib/common";

const createEnrollmentRoute = express();

//관리자용으로 만들었는데 없어도 될듯
createEnrollmentRoute.post(
  "/",
  responseHandler(async (req) => {
    const { lecture, students } = req.body;

    // 유효성 검증 , id..

    return await createEnrollments({ lecture, students });
  })
);

export default createEnrollmentRoute;

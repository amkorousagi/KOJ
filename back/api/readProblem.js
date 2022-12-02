import express from "express";
import { checkIsRealStudent } from "../controller/enrollement";
import { readProblem } from "../controller/problem";
import { responseHandler } from "../lib/common";

const readProblemRoute = express();

readProblemRoute.post(
  "/",
  responseHandler(async (req) => {
    const { practice } = req.body;

    // 유효성 검증 , id..
    // 실제 수강생이 맞는지 체크
    // lecture와 req.user의 쌍이 enroll 에 있는지 비교
    if (checkIsRealStudent({ practice, student: req.user._id }) == true) {
      return await readProblem({ practice });
    } else {
      throw Error("unanthorized access for this problem");
    }
  })
);

export default readProblemRoute;

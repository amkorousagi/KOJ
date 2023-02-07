import express from "express";
import { readUser } from "../controller/user";
import { responseHandler } from "../lib/common";

const readUserRoute = express();

readUserRoute.post(
  "/",
  responseHandler(async (req) => {
    const { name, student_id } = req.body;

    // 유효성 검증 , id..

    return await readUser({ name, student_id });
  })
);

export default readUserRoute;

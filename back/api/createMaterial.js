import express from "express";
import { createMaterial } from "../controller/material";
import { responseHandler } from "../lib/common";

const createMaterialRoute = express();

createMaterialRoute.post(
  "/",
  responseHandler(async (req) => {
    const { lecture, title, body, attachments } = req.body;
    console.log(req.body);
    // 유효성 검증 , id..

    return await createMaterial({ lecture, title, body, attachments });
  })
);

export default createMaterialRoute;

import express from "express";
import { updateMaterial } from "../controller/material";
import { responseHandler } from "../lib/common";

const updateMaterialRoute = express();

updateMaterialRoute.post(
  "/",
  responseHandler(async (req) => {
    const { material, title, body, attachments } = req.body;
    console.log(req.body);
    // 유효성 검증 , id..

    return await updateMaterial({ material, title, body, attachments });
  })
);

export default updateMaterialRoute;

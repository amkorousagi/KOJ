import express from "express";
import { checkOwner, updateMaterial } from "../controller/material";
import { responseHandler } from "../lib/common";

const updateMaterialRoute = express();

updateMaterialRoute.post(
  "/",
  responseHandler(async (req) => {
    const { material, title, body, attachments } = req.body;
    console.log(req.body);
    // 유효성 검증 , id..
    await checkOwner({ material, owner: req.user._id });
    return await updateMaterial({ material, title, body, attachments });
  })
);

export default updateMaterialRoute;

import express from "express";
import { readMaterial } from "../controller/material";
import { responseHandler } from "../lib/common";

const readMaterialRoute = express();

readMaterialRoute.post(
  "/",
  responseHandler(async (req) => {
    const { lecture } = req.body;
    console.log(req.body);
    // 유효성 검증 , id..

    return await readMaterial({ lecture });
  })
);

export default readMaterialRoute;

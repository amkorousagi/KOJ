import express from "express";
import { deleteMaterial } from "../controller/material";
import { responseHandler } from "../lib/common";

const deleteMaterialRoute = express();

deleteMaterialRoute.post(
  "/",
  responseHandler(async (req) => {
    const { material } = req.body;
    console.log(req.body);
    // 유효성 검증 , id..

    return await deleteMaterial({ material });
  })
);

export default deleteMaterialRoute;

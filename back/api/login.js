import express from "express";
import { findUserById } from "../controller/user";
import { responseHandler } from "../lib/common";

const router = express();

// unauthorized api
router.get(
  "/",
  responseHandler(async (req) => {
    return await findUserById();
  })
);
// authorized api

export default router;

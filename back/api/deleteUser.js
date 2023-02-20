import express from "express";
import { deleteUser } from "../controller/user";
import { responseHandler } from "../lib/common";

const deleteUserRoute = express();

deleteUserRoute.post(
  "/",
  responseHandler(async (req) => {
    const { id } = req.body;

    // 유효성 검증 , id..

    return await deleteUser({ id });
  })
);

export default deleteUserRoute;

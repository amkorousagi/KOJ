import express from "express";
import { adminUpdateUser } from "../controller/user";
import { responseHandler } from "../lib/common";
import bcrypt from "bcrypt";

const adminUpdateUserPasswordRoute = express();

adminUpdateUserPasswordRoute.post(
  "/",
  responseHandler(async (req) => {
    const { id, password } = req.body;
    console.log(req.body);
    const newHash = bcrypt.hashSync(password, 10);
    return await adminUpdateUser({
      id,
      password: newHash,
    });
  })
);

export default adminUpdateUserPasswordRoute;

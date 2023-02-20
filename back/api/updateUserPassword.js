import express from "express";
import { updateUser } from "../controller/user";
import { responseHandler } from "../lib/common";
import bcrypt from "bcrypt";

const updateUserPasswordRoute = express();

updateUserPasswordRoute.post(
  "/",
  responseHandler(async (req) => {
    const { password, newPassword } = req.body;
    console.log(req.body);
    const newHash = bcrypt.hashSync(newPassword, 10);
    return await updateUser({
      id: req.user.id,
      password,
      newPassword: newHash,
    });
  })
);

export default updateUserPasswordRoute;

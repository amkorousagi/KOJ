import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserById, findUserByIdAndUser_type } from "../controller/user";
import { responseHandler, sendErrorWithoutLog } from "../lib/common";
import { secret } from "../secret";
import logger from "../lib/logger";

const loginRoute = express();

loginRoute.post(
  "/",
  responseHandler(async (req, res) => {
    const { id, password } = req.body;
    logger.info(req.body);
    const user = await findUserByIdAndUser_type({ id });
    if (user) {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        const token = jwt.sign({ id, user_type: user.user_type }, secret, {
          expiresIn: 60 * 60 * 24 * 3,
        });
        return { token, user_type: user.user_type };
      } else {
        sendErrorWithoutLog({ req, res, error: "잘못된 비밀번호입니다." });
      }
    } else {
      sendErrorWithoutLog({
        req,
        res,
        error: "잘못된 아이디입니다.",
      });
    }
  })
);

export default loginRoute;

import express from "express";
import { insertManyUser } from "../controller/user";
import { responseHandler } from "../lib/common";
import bcrypt from "bcrypt";

const router = express();

router.post(
  "/",
  responseHandler(async (req) => {
    const { users } = req.body;
    const hashed_users = users.map((item) => {
      const { id, password, name, user_type } = item;
      const hash = bcrypt.hashSync(password, 10);

      return { id, password: hash, name, user_type };
    });
    return await insertManyUser(hashed_users);
  })
);

export default router;

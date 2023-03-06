import express from "express";
import { createEnrollStudent, insertManyUser } from "../controller/user";
import { responseHandler } from "../lib/common";
import bcrypt from "bcrypt";

const createEnrollmentStudentRoute = express();

createEnrollmentStudentRoute.post(
  "/",
  responseHandler(async (req) => {
    const { users, lecture } = req.body;
    console.log(users);
    const hashed_users = users.map((item) => {
      const { id, password, name, user_type } = item;
      const hash = bcrypt.hashSync(password, 10);

      return { id, password: hash, name, user_type };
    });
    return await createEnrollStudent({ users: hashed_users, lecture });
  })
);

export default createEnrollmentStudentRoute;

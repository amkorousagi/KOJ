import express from "express";
import { createEnrollStudent, insertManyUser } from "../controller/user";
import { responseHandler } from "../lib/common";
import bcrypt from "bcrypt";
import { checkOwner } from "../controller/enrollement";
import { USER_TYPE } from "../type";

const createEnrollmentStudentRoute = express();

//학생등록및생성
createEnrollmentStudentRoute.post(
  "/",
  responseHandler(async (req) => {
    const { users, lecture } = req.body;
    console.log(users);
    if (req.user.user_type !== USER_TYPE.ADMIN) {
      await checkOwner({ lecture, owner: req.user._id });
    }
    const hashed_users = users.map((item) => {
      const { id, password, name, user_type } = item;
      const hash = bcrypt.hashSync(password, 10);

      return { id, password: hash, name, user_type };
    });
    return await createEnrollStudent({ users: hashed_users, lecture });
  })
);

export default createEnrollmentStudentRoute;

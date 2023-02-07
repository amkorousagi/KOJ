import User from "../model/user";
import { USER_TYPE } from "../type";
/*
import bcrypt from "bcrypt";
import mongoose from "mongoose";
const admin = async () => {
  const a = new User({
    id: "admin",
    password: bcrypt.hashSync("eselab", 10),
    name: "박세찬",
    user_type: USER_TYPE.ADMIN,
  });
  await a.save();
};
admin();
*/
export async function findUserById({ id }) {
  return await User.findOne({ id });
}

export async function findUserByIdAndUser_type({ id, user_type }) {
  return await User.findOne({ id, user_type });
}

export async function createUser({ id, password, name, user_type }) {
  const user = new User({ id, password, name, user_type });

  return await user.save();
}

export async function readUser({ name, student_id }) {
  const condition = {};
  if (name) {
    condition["name"] = name;
  }
  if (student_id) {
    condition["student_id"] = student_id;
  }
  return await User.find(condition);
}

export async function insertManyUser(users) {
  const session = await mongoose.startSession();
  const result = await User.insertMany(users);

  await session.endSession();
  return result;
}

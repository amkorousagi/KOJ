import { sendErrorWithoutLog } from "../lib/common";
import User from "../model/user";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { USER_TYPE } from "../type";
import Enrollment from "../model/enrollment";

export async function initAdmin() {
  const a = new User({
    id: "admin",
    password: bcrypt.hashSync("eselab", 10),
    name: "박세찬",
    user_type: USER_TYPE.ADMIN,
  });
  await a.save();
}

export async function findUserById({ id }) {
  return await User.findOne({ id });
}

export async function findUserByIdAndUser_type({ id }) {
  return await User.findOne({ id });
}

export async function createUser({ id, password, name, user_type }) {
  const user = new User({ id, password, name, user_type });

  return await user.save();
}

export async function readUser({ name, student_id }) {
  const condition = {};
  if (name) {
    condition["name"] = { $regex: name, $options: "i" };
  }
  if (student_id) {
    condition["id"] = { $regex: student_id, $options: "i" };
  }
  return await User.find(condition);
}

export async function insertManyUser(users) {
  const session = await mongoose.startSession();
  session.startTransaction();
  let result;
  try {
    result = await User.insertMany(users, { session });
    await session.commitTransaction();
  } catch (err) {
    //학번 같은 유저 있으면 넣지 말기
    //console.log(err);
    await session.abortTransaction();
    throw new Error(err.message);
  } finally {
    await session.endSession();
  }
  return result;
}

export async function createEnrollStudent({ lecture, users }) {
  const session = await mongoose.startSession();
  session.startTransaction();
  let result;
  try {
    result = await Promise.allSettled(
      users.map(async (item) => {
        let saved;
        const existing = await User.findByOne({ id: item.id });
        if (existing) {
          console.log("ex us", item.id);
          saved = existing;
        } else {
          const user = new User({ ...item });
          saved = await user.save({ session });
          //이미 존재하는 학생은 동일한 primary key로 만들수 없으니 해당 프로미스가 실패.
        }

        const existing_enrollment = await Enrollment.findOne({
          lecture,
          student: saved._id,
        });
        if (existing_enrollment) {
          console.log("ex en", item.id);
          return;
        } else {
          const enrollment = new Enrollment({ lecture, student: saved._id });
          return await enrollment.save({ session });
        }
      })
    );
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err.message);
  }
  await session.commitTransaction();
  await session.endSession();

  return result;
}

export async function updateUser({ id, password, newPassword }) {
  const user = await User.findOne({ id });
  console.log(user);
  console.log(password);
  const result = await bcrypt.compare(password, user.password);
  if (result) {
    await User.findOneAndUpdate(
      { id },
      { password: newPassword },
      { new: true }
    );
    return { success: true, message: "비밀번호 변경 성공" };
  } else {
    return { success: false, message: "현재 비밀번호가 일치하지 않습니다." };
  }
}

export async function deleteUser({ id }) {
  return await User.findOneAndDelete({ id });
}

export async function adminUpdateUser({ id, password }) {
  return await User.findOneAndUpdate({ id }, { password }, { new: true });
}

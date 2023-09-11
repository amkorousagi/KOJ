import mongoose from "mongoose";
import Enrollment from "../model/enrollment";
import Practice from "../model/practice";
import Lecture from "../model/lecture";
import Problem from "../model/problem";

export async function checkOwner({ lecture, owner }) {
  let l;
  if (lecture) {
    l = await Lecture.findById(lecture);
  }

  if (l) {
    if (l.lecturer.toString() === owner.toString()) {
      return;
    } else {
      console.log(l.lecturer);
      console.log(owner);
      throw new Error("not owner");
    }
  } else {
    throw new Error("cannot check owner");
  }
}

export async function createEnrollments({ lecture, students }) {
  const session = await mongoose.startSession();
  session.startTransaction();
  const enrollments = [];
  let result;

  try {
    await Promise.all(
      students.map(async (item) => {
        const existing = await Enrollment.find({ lecture, student: item });
        if (existing.length == 0) {
          enrollments.push({ lecture, student: item });
        }
      })
    );
    result = await Enrollment.insertMany(enrollments, { session });
    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    throw new Error(err.message);
  } finally {
    await session.endSession();
  }
  return result;
}
export async function readEnrollent({ lecture, student }) {
  const condition = {};
  if (lecture) {
    condition["lecture"] = lecture;
  }
  if (student) {
    condition["student"] = student;
  }
  return await Enrollment.find(condition);
}
export async function checkIsRealStudent({ practice, problem, student }) {
  let p;
  if (problem) {
    const pp = await Problem.findById(problem);
    p = await Practice.findById(pp.practice);
  } else {
    p = await Practice.findById(practice);
  }

  console.log({ p });
  if (p) {
    const enrollment = await Enrollment.find({ lecture: p.lecture, student });
    console.log({ enrollment });
    if (enrollment.length == 0) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}

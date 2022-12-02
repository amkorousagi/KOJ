import mongoose from "mongoose";
import Enrollment from "../model/enrollment";
import Practice from "../model/practice";

export async function createEnrollments({ lecture, students }) {
  const session = await mongoose.startSession();
  const enrollments = students.map((item) => {
    return { lecture, student: item };
  });
  const result = await Enrollment.insertMany(enrollments);
  await session.endSession();
  return result;
}

export async function checkIsRealStudent({ practice, student }) {
  const p = await Practice.findById(practice);
  const enrollment = Enrollment.find({ lecture: p.lecture, student });
  if (enrollment.length == 0) {
    return false;
  } else {
    return true;
  }
}

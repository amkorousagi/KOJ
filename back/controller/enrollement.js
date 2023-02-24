import mongoose from "mongoose";
import Enrollment from "../model/enrollment";
import Practice from "../model/practice";

export async function createEnrollments({ lecture, students }) {
  const session = await mongoose.startSession();
  const enrollments = [];
  await Promise.all(
    students.map(async (item) => {
      const existing = await Enrollment.find({ lecture, student: item });
      if (existing.length == 0) {
        enrollments.push({ lecture, student: item });
      }
    })
  );
  const result = await Enrollment.insertMany(enrollments);
  await session.endSession();
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
export async function checkIsRealStudent({ practice, student }) {
  const p = await Practice.findById(practice);
  if (p) {
    const enrollment = await Enrollment.find({ lecture: p.lecture, student });
    console.log(enrollment);
    if (enrollment.length == 0) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}

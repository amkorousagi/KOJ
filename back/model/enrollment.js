import mongoose, { Schema } from "mongoose";

const enrollmentSchema = mongoose.Schema({
  lecture: { type: Schema.Types.ObjectId, ref: "Lecture" },
  student: { type: Schema.Types.ObjectId, ref: "User" },
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
export default Enrollment;

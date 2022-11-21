import mongoose, { Schema } from "mongoose";

const submissionSchema = mongoose.Schema({
  problem: [{ type: Schema.Types.ObjectId, ref: "Problem" }],
  student: [{ type: Schema.Types.ObjectId, ref: "User" }],
  created_date: Date,
  code: String,
  log: String,
  language: String,
  success: Number,
  fail: Number,
  result: [Boolean],
  output: [String],
  feedback: [String],
});

const Submission = mongoose.model("Submission", submissionSchema);
export default Submission;

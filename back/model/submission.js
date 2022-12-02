import mongoose, { Schema } from "mongoose";

const submissionSchema = mongoose.Schema({
  problem: { type: Schema.Types.ObjectId, ref: "Problem" },
  student: { type: Schema.Types.ObjectId, ref: "User" },
  state: { type: String, default: "to_do" },
  created_date: Date,
  code: String,
  language: String,
  success: Number,
  fail: Number,
  log: [String],
  result: [Boolean],
  output: [String],
  feedback: [String],
});

const Submission = mongoose.model("Submission", submissionSchema);
export default Submission;

import mongoose from "mongoose";

const submissionSchema = mongoose.Schema({
  problem: { type: mongoose.Schema.Types.ObjectId, ref: "Problem" },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  state: { type: String, default: "to_do" },
  created_date: { type: Date, required: true, default: () => Date.now() },
  code: [String],
  language: String,
  success: [Boolean],
  stdout: [String],
  stderr: [String],
  actual_file: [String],
  expected_file: [String],
  exit_code: [Number],
  error_type: [String],
  cpu_usage: [Number],
  mermory_usage: [Number],
  signal: [String],
  error: [String],
  feedback: [String],
  entry: String,
  result: String,
  blank: [String],
});

const Submission = mongoose.model("Submission", submissionSchema);
export default Submission;

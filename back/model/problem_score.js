import mongoose, { Schema } from "mongoose";

const problem_scoreSchema = mongoose.Schema({
  problem: { type: Schema.Types.ObjectId, ref: "Problem" },
  student: { type: Schema.Types.ObjectId, ref: "User" },
  submission: { type: Schema.Types.ObjectId, ref: "Submission" },
  score: Number,
  created_date: { type: Date, required: true, default: () => Date.now() },
  updated_date: { type: Date, required: true, default: () => Date.now() },
});

const Problem_score = mongoose.model("Problem_score", problem_scoreSchema);
export default Problem_score;

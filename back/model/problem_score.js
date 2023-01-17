import mongoose, { Schema } from "mongoose";

const problem_scoreSchema = mongoose.Schema({
  problem: { type: Schema.Types.ObjectId, ref: "Problem" },
  student: { type: Schema.Types.ObjectId, ref: "User" },
  score: Number,
});

const Problem_score = mongoose.model("Problem_score", problem_scoreSchema);
export default Problem_score;

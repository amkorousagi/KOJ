import mongoose, { Schema } from "mongoose";

const problem_analysisSchema = mongoose.Schema({
  practice: [{ type: Schema.Types.ObjectId, ref: "Practice" }],
  problem: [{ type: Schema.Types.ObjectId, ref: "Problem" }],
  average: Number,
  standard: Number,
  perfect: Number,
  unsubmit: Number,
});

const Problem_analysis = mongoose.model(
  "Problem_analysis",
  problem_analysisSchema
);
export default Problem_analysis;

import mongoose from "mongoose";

const problemSchema = mongoose.Schema({
  practice: { type: mongoose.Schema.Types.ObjectId, ref: "Practice" },
  problem_type: String,
  title: String,
  description: String, // blank 면 front에서 특정 문자열을 가려주도록
  score: Number,
  pdf: [String],
  result_answer: String,
  execution_time_limit: Number,
  blank: String,
});

const Problem = mongoose.model("Problem", problemSchema);
export default Problem;

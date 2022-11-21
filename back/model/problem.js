import mongoose, { Schema } from "mongoose";

const problemSchema = mongoose.Schema({
  practice: [{ type: Schema.Types.ObjectId, ref: "Practice" }],
  title: String,
  description: String,
  score: Number,
  pdf: [String],
  model_answer: String,
  blank_answer: String,
  execution_time_limit: Number,
  problem_type: String,
  input_text: Boolean,
  output_text: Boolean,
  input_file: Boolean,
  output_file: Boolean,
});

const Problem = mongoose.model("Problem", problemSchema);
export default Problem;

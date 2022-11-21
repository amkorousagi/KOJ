import mongoose, { Schema } from "mongoose";

const testcaseSchema = mongoose.Schema({
  problem: [{ type: Schema.Types.ObjectId, ref: "Problem" }],
  score: Number,
  hidden: Boolean,
  input_text: String,
  output_text: String,
  input_file: [String],
  output_file: [String],
});

const Testcase = mongoose.model("Testcase", testcaseSchema);
export default Testcase;

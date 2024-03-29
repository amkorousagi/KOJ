import mongoose from "mongoose";

const testcaseSchema = mongoose.Schema({
  problem: { type: mongoose.Schema.Types.ObjectId, ref: "Problem" },
  title: String,
  score: Number,
  hidden: Boolean,
  input_text: String,
  arg_text: String,
  output_text: String,
  input_file: [String],
  output_file: [String],
});

const Testcase = mongoose.model("Testcase", testcaseSchema);
export default Testcase;

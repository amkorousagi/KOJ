const mongoose = require("mongoose");

const testcaseSchema = mongoose.Schema({
  problem: [{ type: mongoose.Schema.Types.ObjectId, ref: "Problem" }],
  title: String,
  score: Number,
  hidden: Boolean,
  input_text: String,
  output_text: String,
  input_file: [String],
  output_file: [String],
});

const Testcase = mongoose.model("Testcase", testcaseSchema);
module.exports = { Testcase };

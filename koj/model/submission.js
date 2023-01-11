const mongoose = require("mongoose");

const submissionSchema = mongoose.Schema({
  problem: [{ type: mongoose.Schema.Types.ObjectId, ref: "Problem" }],
  student: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  created_date: Date,
  code: String,
  log: String,
  language: String,
  success: Number,
  fail: Number,
  result: [Boolean],
  output: [String],
  feedback: [String],
});

const Submission = mongoose.model("Submission", submissionSchema);
module.exports = { Submission };

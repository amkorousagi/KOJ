import mongoose, { Schema } from "mongoose";

const practiceSchema = mongoose.Schema({
  lecture: { type: Schema.Types.ObjectId, ref: "Lecture" },
  title: String,
  start_date: Date,
  end_date: Date,
});

const Practice = mongoose.model("Practice", practiceSchema);
export default Practice;

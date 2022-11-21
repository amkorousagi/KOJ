import mongoose, { Schema } from "mongoose";

const lectureSchema = mongoose.Schema({
  lecturer: [{ type: Schema.Types.ObjectId, ref: "User" }],
  title: String,
  semester: String,
});

const Lecture = mongoose.model("Lecture", lectureSchema);
export default Lecture;

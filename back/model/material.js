import mongoose, { Schema } from "mongoose";

const materialSchema = mongoose.Schema({
  lecture: { type: Schema.Types.ObjectId, ref: "Lecture" },
  title: String,
  body: String,
  attachments: [String],
  created_date: { type: Date, required: true, default: () => Date.now() },
});

const Material = mongoose.model("Material", materialSchema);
export default Material;

import mongoose from "mongoose";

const fileSchema = mongoose.Schema({
  date: { type: Date, default: Date.now() },
  name: String,
  description: String,
  extension: String,
  mimetype: String,
});

const File = mongoose.model("File", fileSchema);
export default File;

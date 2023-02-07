import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  id: { type: String, unique: true },
  student_id: String,
  password: String,
  name: String,
  user_type: String,
});

const User = mongoose.model("User", userSchema);
export default User;

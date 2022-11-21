import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  name: String,
});
testSchema.methods.speak = function speak() {
  console.log(this.name ? "My name is " + this.name : "I don't have a name");
};
const Test = mongoose.model("Test", testSchema);
export default Test;

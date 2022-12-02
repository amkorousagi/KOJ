import Testcase from "../model/testcase";
import { USER_TYPE } from "../type";

export async function createTestcase({
  problem,
  score,
  hidden,
  input_text,
  output_text,
  input_file,
  output_file,
}) {
  const testcase = new Testcase({
    problem,
    score,
    hidden,
    input_text,
    output_text,
    input_file,
    output_file,
  });
  return await testcase.save();
}

export async function readTestcase({ problem, user_type }) {
  if (user_type == USER_TYPE.STUDENT) {
    return await Testcase.find({ problem, hidden: false });
  } else {
    return await Testcase.find({ problem });
  }
}

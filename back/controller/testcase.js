import Problem from "../model/problem";
import Testcase from "../model/testcase";
import { USER_TYPE } from "../type";

export async function checkOwner({ problem, testcase, owner }) {
  let l;
  if (problem) {
    l = await Problem.findById(problem)
      .populate({
        path: "practice",
        populate: { path: "lecture" },
      })
      .exec();
    l = l.practice.lecture;
  } else if (testcase) {
    l = await Testcase.findById(testcase)
      .populate({
        path: "problem",
        populate: {
          path: "practice",
          populate: {
            path: "lecture",
          },
        },
      })
      .exec();
    l = l.problem.practice.lecture;
  }

  if (l) {
    if (l.lecturer.toString() === owner.toString()) {
      return;
    } else {
      throw new Error("not owner");
    }
  } else {
    throw new Error("cannot check owner");
  }
}

export async function createTestcase({
  problem,
  title,
  score,
  hidden,
  input_text,
  arg_text,
  output_text,
  input_file,
  output_file,
}) {
  const testcase = new Testcase({
    problem,
    title,
    score,
    hidden,
    input_text,
    arg_text,
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

export async function updateTestcase({
  testcase,
  title,
  score,
  hidden,
  input_text,
  arg_text,
  output_text,
  input_file,
  output_file,
}) {
  const update = {};
  if (title != null) {
    update.title = title;
  }
  if (score) {
    update.score = score;
  }
  if (hidden !== undefined) {
    update.hidden = hidden;
  }
  if (input_text != null) {
    update.input_text = input_text;
  }
  if (output_text != null) {
    update.output_text = output_text;
  }
  if (input_file) {
    update.input_file = input_file;
  }
  if (output_file) {
    update.output_file = output_file;
  }
  if (arg_text) {
    update.arg_text = arg_text;
  }
  return await Testcase.findByIdAndUpdate(testcase, update, { new: true });
}

export async function deleteTestcase({ testcase }) {
  return await Testcase.findByIdAndDelete(testcase);
}

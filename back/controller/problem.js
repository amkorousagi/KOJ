import Practice from "../model/practice";
import Problem from "../model/problem";
import { PROBLEM_TYPE } from "../type";

export async function checkOwner({ practice, problem, owner }) {
  let l;
  if (problem) {
    l = await Problem.findById(problem)
      .populate({
        path: "pratice",
        populate: { path: "lecture" },
      })
      .exec();
  } else if (practice) {
    l = await Practice.findById(practice).populate("lecture").exec();
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

export async function createProblem({
  practice,
  problem_type,
  title,
  description,
  score,
  pdf,
  result_answer,
  execution_time_limit,
  blank,
}) {
  const problem = new Problem({
    practice,
    problem_type,
    title,
    description,
    score,
    pdf,
    result_answer,
    execution_time_limit,
    blank,
  });
  return await problem.save();
}

export async function readProblem({ practice }) {
  return await Problem.find({ practice });
}

export async function updateProblem({
  problem,
  problem_type,
  title,
  description,
  score,
  pdf,
  result_answer,
  execution_time_limit,
  blank,
}) {
  const update = {};
  if (problem_type) {
    update.problem_type = problem_type;
  }
  if (title) {
    update.title = title;
  }
  if (description) {
    update.description = description;
  }
  if (score) {
    update.score = score;
  }
  if (pdf) {
    update.pdf = pdf;
  }
  if (result_answer) {
    update.result_answer = result_answer;
  }
  if (execution_time_limit) {
    update.execution_time_limit = execution_time_limit;
  }
  if (blank) {
    update.blank = blank;
  }

  return await Problem.findByIdAndUpdate(problem, update, { new: true });
}

export async function deleteProblem({ problem }) {
  return await Problem.findByIdAndDelete(problem);
}

import Problem from "../model/problem";
import { PROBLEM_TYPE } from "../type";

export async function createProblem({
  practice,
  problem_type,
  title,
  description,
  score,
  pdf,
  result_answer,
}) {
  const problem = new Problem({
    practice,
    problem_type,
    title,
    description,
    score,
    pdf,
    result_answer,
  });
  return await problem.save();
}

export async function readProblem({ practice }) {
  return await Problem.find({ practice });
}

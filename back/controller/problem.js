import Problem from "../model/problem";
import { PROBLEM_TYPE } from "../type";

export async function createProblem({
  practice,
  problem_type,
  title,
  description,
  score,
  pdf,
  blank_answer,
  result_answer,
  input_text,
  output_text,
  input_file,
  output_file,
}) {
  const problem = new Problem({
    practice,
    problem_type,
    title,
    description,
    score,
    pdf,
    blank_answer,
    result_answer,
    input_text,
    output_text,
    input_file,
    output_file,
  });
  return await problem.save();
}

export async function readProblem({ practice }) {
  return await Problem.find({ practice });
}

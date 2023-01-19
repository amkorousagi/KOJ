import Testcase from "../model/testcase";
import Problem_score from "../model/problem_score";

export async function createScore({ problem, student }) {
  const existing = await Problem_score.find({ problem, student });
  if (existing.length == 0) {
    const problem_score = new Problem_score({
      problem,
      student,
      score: 0,
    });

    return await problem_score.save();
  } else {
    return existing[0];
  }
}

export async function updateScore({ problem_score_id, score }) {
  const problem_score = await Problem_score.findById(problem_score_id);
  return await Problem_score.findByIdAndUpdate(
    problem_score_id,
    {
      score: problem_score.score < score ? score : problem_score.score,
      updated_date: Date.now(),
    },
    {
      new: true,
    }
  );
}

export async function calcScore({ problem, success }) {
  const testcases = await Testcase.find({ problem });
  const scores = testcases.map((item) => item.score);
  let score = 0;
  scores.map((item, index) => {
    score += item * success[index];
  });
  return score;
}

export async function readProblemScore({ problem, student }) {
  const required = {};
  if (problem) {
    required["problem"] = problem;
  }
  if (student) {
    required["student"] = student;
  }
  return await Problem_score.find(required);
}

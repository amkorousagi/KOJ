import Testcase from "../model/testcase";
import Problem_score from "../model/problem_score";

export async function createScore({ problem, student }) {
  const problem_score = new Problem_score({
    problem,
    student,
  });

  return await problem_score.save();
}

export async function updateScore({ problem_score_id, score }) {
  return await Problem_score.findByIdAndUpdate(
    problem_score_id,
    {
      score,
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

import Submission from "../model/submission";

export async function createSubmission({
  problem,
  student,
  code,
  log,
  language,
  success,
  fail,
  result,
  output,
  feedback,
}) {
  const submission = new Submission({
    problem,
    student,
    code,
    log,
    language,
    success,
    fail,
    result,
    output,
    feedback,
  });
  return await submission.save();
}

export async function readSubmission({ problem, student }) {
  const required = {};
  if (problem) {
    required["problem"] = problem;
  }
  if (student) {
    required["student"] = student;
  }
  return await Submission.find(required);
}

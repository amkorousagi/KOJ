import Submission from "../model/submission";

export async function initSubmission({ problem, student, code, language }) {
  const submission = new Submission({
    problem,
    student,
    code,
    language,
  });
  return await submission.save();
}

export async function updateSubmission({
  submission_id,
  log,
  success,
  fail,
  result,
  output,
  feedback,
}) {
  return await Submission.findByIdAndUpdate(
    submission_id,
    {
      log,
      success,
      fail,
      result,
      output,
      feedback,
    },
    { new: true }
  );
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

import Submission from "../model/submission";

export async function initSubmission({ problem, student, code, language }) {
  const submission = new Submission({
    problem,
    student,
    state: "to_do",
    code,
    language,
    success: [],
    stdout: [],
    stderr: [],
    exit_code: [],
    error_type: [],
    cpu_usage: [],
    memory_usage: [],
    signal: [],
    error: [],
    feedback: [],
  });
  return await submission.save();
}

export async function updateSubmission({
  submission_id,
  success,
  stdout,
  stderr,
  exit_code,
  error_type,
  cpu_usage,
  memory_usage,
  signal,
  error,
  feedback,
}) {
  return await Submission.findByIdAndUpdate(
    submission_id,
    {
      state: "done",
      success,
      stdout,
      stderr,
      exit_code,
      error_type,
      cpu_usage,
      memory_usage,
      signal,
      error,
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

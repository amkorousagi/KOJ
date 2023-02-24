import Submission from "../model/submission";

export async function initSubmission({
  problem,
  student,
  code,
  language,
  entry,
  result,
  blank,
}) {
  const submission = new Submission({
    problem,
    student,
    state: "to_do",
    code,
    language,
    success: [],
    stdin: [],
    stdout: [],
    stderr: [],
    exit_code: [],
    error_type: [],
    cpu_usage: [],
    memory_usage: [],
    signal: [],
    error: [],
    feedback: [],
    entry,
    result,
    blank,
  });
  return await submission.save();
}

export async function updateSubmission({
  submission_id,
  success,
  stdin,
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
      stdin,
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

export async function readSubmissionById({ id }) {
  return await Submission.findById(id);
}

export async function checkSubmission({ submission_id }) {
  return await Submission.findById(submission_id);
}

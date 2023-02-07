import Lecture from "../model/lecture";
import Enrollment from "../model/enrollment";
import Problem_score from "../model/problem_score";
import Problem from "../model/problem";
import Practice from "../model/practice";
import User from "../model/user";

export async function readDashScore({ lecture, practice }) {
  const dashscore = {};
  const meta = {};
  if (practice) {
    const problems = await Problem.find({ practice });

    const problem_scores = await Problem_score.find({
      problem: { $in: problems.map((item) => item._id) },
    });

    for (const problem_score of problem_scores) {
      if (dashscore[problem_score.student]) {
        dashscore[problem_score.student][problem_score.problem] =
          problem_score.score;
        dashscore[problem_score.student].score += problem_score.score;
      } else {
        dashscore[problem_score.student] = {
          student: problem_score.student,
          score: problem_score.score,
          [problem_score.problem]: problem_score.score,
        };
      }
    }
    meta["problems"] = problems;
  } else {
    const practices = await Practice.find({ lecture });
    let problems_all = [];

    for (const practice of practices) {
      const problems = await Problem.find({ practice: practice._id });
      problems_all = [...problems_all, ...problems];

      const problem_scores = await Problem_score.find({
        problem: { $in: problems.map((item) => item._id) },
      });

      const dash = {};

      for (const problem_score of problem_scores) {
        if (dash[problem_score.student]) {
          dash[problem_score.student].score += problem_score.score;
        } else {
          dash[problem_score.student] = {
            student: problem_score.student,
            score: problem_score.score,
          };
        }
      }

      for (const d in dash) {
        if (dashscore[d]) {
          dashscore[d].score += dash[d].score;
          dashscore[d][practice._id] = dash[d].score;
        } else {
          dashscore[d] = {
            student: dash[d].student,
            score: dash[d].score,
            [practice._id]: dash[d].score,
          };
        }
      }
    }
    meta["problems"] = problems_all;
    meta["practices"] = practices;
  }

  // 나중에 학생이 되면 하자
  const enr = await Enrollment.find({ lecture }).populate("student").exec();
  meta["students"] = enr.map((item) => item.student);
  meta["students"].forEach((element) => {
    if (dashscore[element._id]) {
    } else {
      dashscore[element._id] = { student: element._id, score: 0 };
    }
  });

  return { dashscore: Object.values(dashscore), meta };
}

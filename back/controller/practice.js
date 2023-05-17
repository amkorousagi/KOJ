import Practice from "../model/practice";
import Problem from "../model/problem";

export async function checkOwner({ lecture, practice, owner }) {
  let l;
  if (lecture) {
    l = await Lecture.findById(lecture);
  } else if (practice) {
    l = await Practice.findById(practice).populate("lecture").exec();
  }

  if (l) {
    if (l.lecturer === owner) {
      return;
    } else {
      throw new Error("not owner");
    }
  } else {
    throw new Error("cannot check owner");
  }
}

export async function createPractice({ lecture, title, start_date, end_date }) {
  const practice = new Practice({
    lecture,
    title,
    start_date: new Date(start_date),
    end_date: new Date(end_date),
  });
  return await practice.save();
}

export async function readPractice({ lecture }) {
  const practices = await Practice.find({ lecture });
  const results = [];
  await Promise.allSettled(
    practices.map(async (item) => {
      const problemList = await Problem.find({ practice: item._id });
      item["problemList"] = problemList;
      results.push(item);
      return;
    })
  );
  return results;
}

export async function updatePractice({
  practice,
  title,
  start_date,
  end_date,
}) {
  const update = {};
  if (title) {
    update.title = title;
  }
  if (start_date) {
    update.start_date = start_date;
  }
  if (end_date) {
    update.end_date = end_date;
  }
  return await Practice.findByIdAndUpdate(practice, update, { new: true });
}

export async function deletePractice({ practice }) {
  await Problem.deleteMany({ practice });
  return await Practice.findByIdAndDelete(practice);
}

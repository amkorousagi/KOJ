import Practice from "../model/practice";
import Problem from "../model/problem";

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

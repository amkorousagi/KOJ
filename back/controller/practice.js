import Practice from "../model/practice";

export async function createPractice({ lecture, title, start_date, end_date }) {
  const practice = new Practice({ lecture, title, start_date, end_date });
  return await practice.save();
}

export async function readPractice({ lecture }) {
  return await Practice.find({ lecture });
}

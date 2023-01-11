import Lecture from "../model/lecture";
import Enrollment from "../model/enrollment";

export async function createLecture({ lecturer, title, semester }) {
  const lecture = new Lecture({ lecturer, title, semester });
  console.log(lecture);
  console.log({ lecturer, title, semester });
  return await lecture.save();
}

export async function readLecture({ lecturer, student }) {
  let lectures = [];
  if (lecturer) {
    return await Lecture.find({ lecturer });
  } else if (student) {
    const enrollments = await Enrollment.find({ student });
    lectures = await Promise.all(
      enrollments.map(async (item) => {
        return await Lecture.findById(item.lecture).populate("lecturer");
      })
    );
  } else {
    lectures = await Lecture.find({}).populate("lecturer");
  }

  return lectures;
}

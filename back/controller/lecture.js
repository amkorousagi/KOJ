import Lecture from "../model/lecture";
import Enrollment from "../model/enrollment";

export async function checkOwner({ lecture, owner }) {
  const l = await Lecture.findById(lecture);
  if (l) {
    if (l.lecturer.toString() === owner.toString()) {
      return;
    } else {
      throw new Error("not owner");
    }
  } else {
    throw new Error("cannot check owner");
  }
}

export async function createLecture({ lecturer, title, semester }) {
  const lecture = new Lecture({ lecturer, title, semester });
  console.log(lecture);
  console.log({ lecturer, title, semester });
  return await lecture.save();
}

export async function readLecture({ lecturer, student }) {
  let lectures = [];
  if (lecturer) {
    return await Lecture.find({ lecturer }).populate("lecturer");
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

export async function updateLecture({ lecture, title, semester }) {
  const update = {};
  if (title) {
    update.title = title;
  }
  if (semester) {
    update.semester = semester;
  }
  return await Lecture.findByIdAndUpdate(lecture, update, { new: true });
}

export async function deleteLecture({ lecture }) {
  return await Lecture.findByIdAndDelete(lecture);
}

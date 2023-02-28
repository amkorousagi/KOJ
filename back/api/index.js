import express from "express";
import loginRoute from "./login";
import createUsersRoute from "./createUsers";
import createLectureRoute from "./createLecture";
import createEnrollmentRoute from "./createEnrollment";
import createPracticeRoute from "./createPractice";
import createProblemRoute from "./createProblem";
import createTestcaseRoute from "./createTestcase";
import createSubmissionRoute from "./createSubmission";
import readLectureRoute from "./readLecture";
import readPracticeRoute from "./readPractice";
import readProblemRoute from "./readProblem";
import readTestcaseRoute from "./readTestcase";
import readSubmissionRoute from "./readSubmission";
import { authorization_handler } from "../middleware/authorization_handler";
import { USER_TYPE } from "../type";
import readProblemScoreRoute from "./readProblemScore";
import checkSubmissionRoute from "./checkSubmission";
import createMaterialRoute from "./createMaterial";
import readMaterialRoute from "./readMaterial";
import readDashScoreRoute from "./readDashScore";
import readEnrollmentRoute from "./readEnrollment";
import readUserRoute from "./readUser";
import updateProblemRoute from "./updateProblem";
import updateLectureRoute from "./updateLecture";
import updateMaterialRoute from "./updateMaterial";
import updatePracticeRoute from "./updatePractice";
import updateTestcaseRoute from "./updateTestcase";
import updateUserPasswordRoute from "./updateUserPassword";
import deleteLectureRoute from "./deleteLecture";
import deleteMaterialRoute from "./deleteMaterial";
import deletePracticeRoute from "./deletePractice";
import deleteProblemRoute from "./deleteProblem";
import deleteTestcaseRoute from "./deleteTestcase";
import deleteUserRoute from "./deleteUser";
import resubmissionRoute from "./ReSubmission";
import adminUpdateUserPasswordRoute from "./adminUpdateUserPassword";

const apiRoute = express();

// unauthorized api
apiRoute.use("/login", loginRoute);

// authorized api
apiRoute.use(
  "/createUsers",
  authorization_handler([USER_TYPE.ADMIN]),
  createUsersRoute
);

apiRoute.use(
  "/createLecture",
  authorization_handler([USER_TYPE.PROFESSOR, USER_TYPE.ADMIN]),
  createLectureRoute
);

apiRoute.use(
  "/createEnrollment",
  authorization_handler([USER_TYPE.PROFESSOR, USER_TYPE.ADMIN]),
  createEnrollmentRoute
);

apiRoute.use(
  "/createPractice",
  authorization_handler([USER_TYPE.PROFESSOR]),
  createPracticeRoute
);

apiRoute.use(
  "/createProblem",
  authorization_handler([USER_TYPE.PROFESSOR]),
  createProblemRoute
);

apiRoute.use(
  "/createTestcase",
  authorization_handler([USER_TYPE.PROFESSOR, USER_TYPE.ADMIN]),
  createTestcaseRoute
);

apiRoute.use(
  "/createSubmission",
  authorization_handler(),
  createSubmissionRoute
);

apiRoute.use("/readLecture", authorization_handler(), readLectureRoute);
apiRoute.use("/readPractice", authorization_handler(), readPracticeRoute);
apiRoute.use("/readProblem", authorization_handler(), readProblemRoute);
apiRoute.use("/readTestcase", authorization_handler(), readTestcaseRoute);
apiRoute.use("/readSubmission", authorization_handler(), readSubmissionRoute);

apiRoute.use(
  "/readProblemScore",
  authorization_handler(),
  readProblemScoreRoute
);
apiRoute.use("/checkSubmission", authorization_handler(), checkSubmissionRoute);

apiRoute.use("/createMaterial", authorization_handler(), createMaterialRoute);
apiRoute.use("/readMaterial", authorization_handler(), readMaterialRoute);
apiRoute.use("/readDashScore", authorization_handler(), readDashScoreRoute);
apiRoute.use("/readEnrollment", authorization_handler(), readEnrollmentRoute);
apiRoute.use("/readUser", authorization_handler(), readUserRoute);

apiRoute.use(
  "/updateLecture",
  authorization_handler([USER_TYPE.PROFESSOR]),
  updateLectureRoute
);
apiRoute.use(
  "/updateMaterial",
  authorization_handler([USER_TYPE.PROFESSOR]),
  updateMaterialRoute
);
apiRoute.use(
  "/updatePractice",
  authorization_handler([USER_TYPE.PROFESSOR]),
  updatePracticeRoute
);
apiRoute.use(
  "/updateProblem",
  authorization_handler([USER_TYPE.PROFESSOR]),
  updateProblemRoute
);
apiRoute.use(
  "/updateTestcase",
  authorization_handler([USER_TYPE.PROFESSOR]),
  updateTestcaseRoute
);
apiRoute.use(
  "/updateUserPassword",
  authorization_handler([USER_TYPE.PROFESSOR]),
  updateUserPasswordRoute
);
apiRoute.use(
  "/adminUpdateUserPassword",
  authorization_handler([USER_TYPE.ADMIN]),
  adminUpdateUserPasswordRoute
);

apiRoute.use(
  "/deleteLecture",
  authorization_handler([USER_TYPE.PROFESSOR]),
  deleteLectureRoute
);
apiRoute.use(
  "/deleteMaterial",
  authorization_handler([USER_TYPE.PROFESSOR]),
  deleteMaterialRoute
);
apiRoute.use(
  "/deletePractice",
  authorization_handler([USER_TYPE.PROFESSOR]),
  deletePracticeRoute
);
apiRoute.use(
  "/deleteProblem",
  authorization_handler([USER_TYPE.PROFESSOR]),
  deleteProblemRoute
);
apiRoute.use(
  "/deleteTestcase",
  authorization_handler([USER_TYPE.PROFESSOR]),
  deleteTestcaseRoute
);
apiRoute.use(
  "/deleteUser",
  authorization_handler([USER_TYPE.PROFESSOR]),
  deleteUserRoute
);
apiRoute.use("/resubmission", authorization_handler(), resubmissionRoute);

export default apiRoute;

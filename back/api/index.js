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

export default apiRoute;

import express from "express";
import { readSubmission, readSubmissionById } from "../controller/submission";
import { responseHandler } from "../lib/common";

const readSubmissionRoute = express();

readSubmissionRoute.post(
  "/",
  responseHandler(async (req) => {
    const { problem, student } = req.body;

    const { id } = req.body;
    if (id !== undefined) {
      console.log("id ", id);
      return await readSubmissionById({ id });
    } else {
      console.log(problem);
      return await readSubmission({
        problem,
        student,
      });
    }
  })
);

export default readSubmissionRoute;

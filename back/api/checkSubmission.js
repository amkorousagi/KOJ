import express from "express";
import { checkSubmission } from "../controller/submission";
import { responseHandler } from "../lib/common";

const checkSubmissionRoute = express();

checkSubmissionRoute.post(
  "/",
  responseHandler(async (req) => {
    const { submission_id } = req.body;
    return await checkSubmission({ submission_id });
  })
);

export default checkSubmissionRoute;

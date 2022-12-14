import express from "express";
import { createTestcase } from "../controller/testcase";
import { responseHandler } from "../lib/common";
import fetch from "node-fetch";
import { KOJ_URL } from "../config";

const createTestcaseRoute = express();

createTestcaseRoute.post(
  "/",
  responseHandler(async (req) => {
    const {
      problem,
      title,
      score,
      hidden,
      input_text,
      output_text,
      input_file,
      output_file,
    } = req.body;

    // 유효성 검증 , id.. problem_type
    const testcase = await createTestcase({
      problem,
      title,
      score,
      hidden,
      input_text,
      output_text,
      input_file,
      output_file,
    });
    // koj : create testcase env
    const result = await fetch(
      KOJ_URL + "/build_judge_environment/" + testcase._id,
      { method: "GET" }
    )
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });

    return result;
  })
);

export default createTestcaseRoute;

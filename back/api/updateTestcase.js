import express from "express";
import { checkOwner, updateTestcase } from "../controller/testcase";
import { responseHandler } from "../lib/common";
import fetch from "node-fetch";
import { KOJ_URL } from "../config";

const updateTestcaseRoute = express();

updateTestcaseRoute.post(
  "/",
  responseHandler(async (req) => {
    const {
      testcase,
      title,
      score,
      hidden,
      input_text,
      arg_text,
      output_text,
      input_file,
      output_file,
    } = req.body;
    await checkOwner({ testcase, owner: req.user._id });

    // 유효성 검증 , id.. problem_type
    const t = await updateTestcase({
      testcase,
      title,
      score,
      hidden,
      input_text,
      arg_text,
      output_text,
      input_file,
      output_file,
    });
    // koj : create testcase env
    const result = await fetch(KOJ_URL + "/build_judge_environment/" + t._id, {
      method: "GET",
    })
      .then((res) => {
        console.log("res ", res);
        return res.json();
      })
      .then((data) => {
        console.log("data ", data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });

    return result;
  })
);

export default updateTestcaseRoute;

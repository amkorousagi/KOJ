const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require("cors");
const FormData = require("form-data");

const { Submission } = require("./model/submission.js");
const { Testcase } = require("./model/testcase.js");
const { id, pwd, dbName, ip, port } = require("./config.js");

const fs = require("fs");
const path = require("path");

const upload_testcase_text = multer({
  storage: multer.diskStorage({
    destination: async function (req, file, cb) {
      const testcase = new Testcase({
        score: req.body.score,
        hidden: req.body.hidden,
      });

      const saved = await testcase.save();
      req.testcase = saved;
      cb(null, "testcase/" + testcase._id);
    },
    filename: function (req, file, cb) {
      cb(null, req.body.filename);
    },
  }),
});

const upload_testcase_file = multer({
  storage: multer.diskStorage({
    destination: async function (req, file, cb) {
      const testcase = new Testcase({
        score: req.body.score,
        hidden: req.body.hidden,
      });

      const saved = await testcase.save();
      req.testcase = saved;
      cb(null, "testcase/" + testcase._id);
    },
    filename: function (req, file, cb) {
      cb(null, req.body.filename);
    },
  }),
});

const upload_submission = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      // submission?
      cb(null, "");
    },
    filename: function (req, file, cb) {
      // submission
      cb(null, "");
    },
  }),
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post(
  "/testcase_text",
  upload_testcase_text.array("files"),
  async (req, res) => {
    res.status(200).json({ success: true });
  }
);

app.post("/submission", upload_testcase.array("files"), async (req, res) => {
  res.status(200).json({ success: true });
});

const port = 3014;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

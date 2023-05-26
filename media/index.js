const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require("cors");
const fetch = require("node-fetch"); // @2
const { File } = require("./model/file.js");
const { id, pwd, dbName, ip, port, KOJ_URL } = require("./config");
const FormData = require("form-data");
const mime = require("mime");
const process = require("process");

const fs = require("fs");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      console.log(file);
      cb(null, "file/");
    },
    filename: function (req, file, cb) {
      console.log(req.body);
      // error 나면 터짐 try catch 필요
      const ex = file.originalname.split(".").pop();
      const f = new File({
        description: req.body[file.originalname],
        name: req.body[file.originalname], //file.originalname,
        extension: ex ? "." + ex : "",
        mimetype: file.mimetype,
      });
      f.save()
        .then((saved) => {
          if (req._id) {
            req._id = [...req._id, f._id];
          } else {
            req._id = [f._id];
          }
          cb(null, f._id + saved.extension);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  }),
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/file/:filename", async (req, res) => {
  const file = await File.findById(req.params.filename);
  const filePath = __dirname + "/file/" + req.params.filename + file.extension;
  // to form data
  console.log(file);
  const formData = new FormData();
  console.log(req.body);
  formData.append("filename", `${file.name}`);
  formData.append("testcase_id", `${req.body.testcase_id}`);
  formData.append("file_type", req.body.file_type);
  formData.append("file", fs.createReadStream(filePath));
  console.log("wwww");
  const result = await fetch(KOJ_URL + "/upload_file", {
    method: "POST",
    body: formData,
  });
  res.status(200).json({ success: true });
});
//code
app.post("/filename", async (req, res) => {
  const { ids } = req.body;
  console.log({ ids });
  const files = [];
  for (const id of ids) {
    const file = await File.findById(id);
    files.push(file);
  }

  return res.json({ success: true, files });
});
app.post("/code/:filename", async (req, res) => {
  try {
    console.log(req.body);
    const file = await File.findById(req.params.filename);
    const filePath =
      __dirname + "/file/" + req.params.filename + file.extension;
    // to form data
    const formData = new FormData();
    formData.append("submission_id", `${req.body.submission_id}`);
    formData.append("filename", `${file.name}`);
    formData.append("file", fs.createReadStream(filePath));
    const result = await fetch(KOJ_URL + "/upload_code", {
      method: "POST",
      body: formData,
    });
    console.log("code upload");
    return res.json({ success: true, name: file.name });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, err });
  }
});
app.get("/string/:filename", async (req, res) => {
  const file = await File.findById(req.params.filename);
  let filePath = __dirname + "/file/" + req.params.filename + file.extension;
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(400).json({ err });
    } else {
      res.status(200).json({ data, file });
    }
  });
});
app.get("/download/:filename", async (req, res) => {
  const file = await File.findById(req.params.filename);
  let filePath = __dirname + "/file/" + req.params.filename + file.extension;

  const mimetype = mime.getType(filePath);
  res.setHeader("Content-disposition", "attachment; filename=" + file.name);
  res.setHeader("Content-type", mimetype);
  res.setHeader("Pragma", file.name);
  const filestream = fs.createReadStream(filePath);
  filestream.pipe(res);
});
app.get("/file/:filename", async (req, res) => {
  const file = await File.findById(req.params.filename);
  let filePath = __dirname + "/file/" + req.params.filename + file.extension;

  res.status(200).sendFile(filePath);
});
app.post("/file", upload.array("files"), async (req, res) => {
  //console.log(req.get("Content-Type"));
  //console.log(req.body);
  //console.log(req.body.files);
  res.status(200).json({ success: true, files: req._id });
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    success: false,
    error: err.name,
  });
});
app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: "invalid url",
  });
});

mongoose
  .connect(`mongodb://${id}:${pwd}@${ip}:${port}/${dbName}`, {
    authSource: "admin",
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(3013, () => {
      console.log("3013 open server");
    });
  })
  .catch((err) => {
    console.log("error connecting to MongoDB:", err.message);
  });

process.on("uncaughtException", (err) => {
  console.log(err);
});

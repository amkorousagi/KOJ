const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require("cors");
const { File } = require("./model/file.js");
const { id, pwd, dbName, ip, port } = require("./config");

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

app.get("/file/:filename", async (req, res) => {
  const file = await File.findById(req.params.filename);
  let filePath = __dirname + "/file/" + req.params.filename + file.extension;

  res.status(200).sendFile(filePath);
});
app.get("/download/:filename", async (req, res) => {
  const file = await File.findById(req.params.filename);
  let filePath = __dirname + "/file/" + req.params.filename + file.extension;

  res.status(200).download(filePath);
});
app.post("/file", upload.array("files"), async (req, res) => {
  console.log(req.get("Content-Type"));
  console.log(req.body);
  console.log(req.body.files);
  res.status(200).json({ success: true, files: req._id });
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    success: true,
    error: err.name,
  });
});
app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: "invalid irl",
  });
});

mongoose
  .connect(`mongodb://${id}:${pwd}@${ip}:${port}/${dbName}`)
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(3013, () => {
      console.log("3013 open server");
    });
  })
  .catch((err) => {
    console.log("error connecting to MongoDB:", err.message);
  });

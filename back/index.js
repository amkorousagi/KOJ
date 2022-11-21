import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import fetch from "node-fetch";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import Test from "./model/test.js";
import { id, pwd, dbName, ip, port } from "./config.js";
const app = express();

async function main() {
  try {
    await mongoose.connect(`mongodb://${id}:${pwd}@${ip}:${port}/${dbName}`);
  } catch (err) {
    console.log(err);
  }

  const apple = new Test({ name: "apple" });
  console.log(apple);
  apple.speak();

  try {
    //await apple.save();
    apple.speak();
  } catch (err) {
    console.log(err);
  }
}
main();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3012, () => {
  console.log(`Example app listening on port ${port}`);
});

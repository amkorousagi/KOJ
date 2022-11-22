import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import fetch from "node-fetch";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import Test from "./model/test";
import { connect_db } from "./db";
import { handlingError, notFoundRouterError } from "./middleware/error_handler";
import logger from "./lib/logger";
import { morganMiddleware } from "./middleware/morgan_middleware";
import apiRouter from "./api";

const port = 3012;
connect_db();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morganMiddleware);

app.use("/api", apiRouter);

app.use(handlingError);
app.all("*", notFoundRouterError);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

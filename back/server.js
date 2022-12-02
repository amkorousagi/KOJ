import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { handlingError, notFoundRouterError } from "./middleware/error_handler";
import { morganMiddleware } from "./middleware/morgan_middleware";
import apiRoute from "./api";
import { authorization_handler } from "./middleware/authorization_handler";
import { responseHandler } from "./lib/common";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morganMiddleware);
app.use(
  "/token",
  authorization_handler(),
  responseHandler((req) => {
    return req.user;
  })
);
app.use("/api", apiRoute);

app.use(handlingError);
app.all("*", notFoundRouterError);

export default app;

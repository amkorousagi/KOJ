import app from "./server";
import { connect_db } from "./db";
import logger from "./lib/logger";
import fs from "fs";
import { exceptions } from "winston";

logger.info("before db");
connect_db().then(() => {
  logger.info("after db");
  setTimeout(() => {
    app.listen(3012, "0.0.0.0", () => {
      logger.info("listens server");
    });
  }, 2000);
});

// 에러메세지없는 listen 실패 포스팅하기
process.on("uncaughtException", (exception) => {
  logger.error(exception.stack);
});
process.once("SIGUSR2", function () {
  gracefulShutdown(function () {
    process.kill(process.pid, "SIGUSR2");
  });
});

import morgan from "morgan";
import logger from "../lib/logger";
import dotenv from "dotenv";

dotenv.config();

const format = () => {
  const result = process.env.NODE_ENV === "production" ? "combined" : "dev";
  return result;
};

const stream = {
  write: (message) => {
    logger.http(
      message.replace(
        /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
        ""
      )
    );
  },
};

const skip = (_, res) => {
  if (process.env.NODE_ENV === "production") {
    return res.statusCode < 400;
  }
  return false;
};

export const morganMiddleware = morgan(format(), { stream, skip });

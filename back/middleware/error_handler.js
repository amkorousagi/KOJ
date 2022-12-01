import { StatusCodes } from "http-status-codes";
import logger from "../lib/logger";

export const handlingError = (err, req, res, next) => {
  let httpCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let data = {
    success: false,
    data: {},
    error: err.name,
    message: err.message,
    detail: err.stack,
  };
  logger.error(err.stack);
  res.status(httpCode).json(data);
};

export const notFoundRouterError = (req, res) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .json({
      success: false,
      data: {},
      error: "invalid url",
      message: "",
      detail: "",
    });
};

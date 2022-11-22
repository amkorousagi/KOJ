import { StatusCodes } from "http-status-codes";
import logger from "./logger";

export function errorHandler(cb) {
  return function (req, res, next) {
    cb(req, res, next).catch(next);
  };
}

export function responseHandler(service) {
  return errorHandler(async (req, res, next) => {
    res.status(StatusCodes.OK).json({
      success: true,
      data: (await service(req, res, next)) ?? {},
      error: "",
      errorDetails: [],
      message: "",
    });
  });
}

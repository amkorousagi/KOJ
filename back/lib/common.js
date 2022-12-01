import { StatusCodes } from "http-status-codes";
import logger from "./logger";

export function errorHandler(cb) {
  return function (req, res, next) {
    cb(req, res, next).catch(next);
  };
}

export function responseHandler(service) {
  return errorHandler(async (req, res, next) => {
    const result = await service(req, res, next);
    if (req.sendErrorWithoutLog != true) {
      res.status(StatusCodes.OK).json({
        success: true,
        data: result ?? {},
        error: "",
        errorDetails: [],
        message: "",
      });
    }
  });
}

export function sendErrorWithoutLog({ req, res, error, message }) {
  req.sendErrorWithoutLog = true;
  res.status(400).json({
    success: false,
    data: {},
    error: error ?? "",
    errorDetails: [],
    message: message ?? "",
  });
}

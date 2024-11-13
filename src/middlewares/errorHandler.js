import mongoose from "mongoose";
import BaseError from "../errors/BaseError.js";
import ValidationError from "../errors/ValidationError.js";
import BadRequestError from "../errors/BadRequestError.js";
import NotFound from "../errors/NotFound.js";

// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
  // console.error(error);

  if (error instanceof mongoose.Error.CastError) {
    new BadRequestError().sendResponse(res);
  } else if (error instanceof mongoose.Error.ValidationError) {
    new ValidationError(error).sendResponse(res);
  } else if (error instanceof NotFound) {
    error.sendResponse(res);
  } else {
    new BaseError().sendResponse(res);
  }
}

export default errorHandler;
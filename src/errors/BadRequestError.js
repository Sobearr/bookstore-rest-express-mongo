import BaseError from "./BaseError.js";

class BadRequestError extends BaseError {
  constructor(message = "Data provided is incorrect") {
    super(message, 400);
  }
}

export default BadRequestError;
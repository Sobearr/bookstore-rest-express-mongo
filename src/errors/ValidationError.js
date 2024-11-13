import BadRequestError from "./BadRequestError.js";

class ValidationError extends BadRequestError {
  constructor(error) {
    const errorMessages = Object.values(error.errors)
      .map(error => error.message)
      .join("; ");
    super(`The following errors were found: ${errorMessages}`);
  }
}

export default ValidationError;
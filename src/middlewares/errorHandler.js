import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
  // console.error(error);

  if (error instanceof mongoose.Error.CastError) {
    res.status(400).send({ message: "One or more data provided are incorrect." });
  } else if (error instanceof mongoose.Error.ValidationError) {
    const errorMessages = Object.values(error.errors)
      .map(error => error.message)
      .join("; ");
    res.status(400).send({ message: `The following errors were found: ${errorMessages}` });
  } else {
    res.status(500).send({ message: "Internal server error." });
  }
}

export default errorHandler;
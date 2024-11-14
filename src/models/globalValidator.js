import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", {
  validator: (value) => value.trim() !== "",
  message: ({ path }) => `${path} field must not be empty`
});
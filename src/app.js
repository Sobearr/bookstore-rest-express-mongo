import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";

// const connection = await connectToDatabase();

db.on("error", (error) => {
  console.error("connection error", error);
});

db.once("open", () => {
  console.log("DB connection successful.");
});

const app = express();
app.use(express.json());

routes(app);

// Error handling middleware
app.use(errorHandler);

export default app;
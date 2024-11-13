import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import handle404 from "./middlewares/handle404.js";

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

app.use(handle404);

// Error handling middleware
app.use(errorHandler);

export default app;
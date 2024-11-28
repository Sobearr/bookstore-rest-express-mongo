import express from "express";
import AuthorController from "../controller/authorController.js";
import pagination from "../middlewares/pagination.js";

const router = express.Router();

router
  .get("/authors", AuthorController.listAuthors, pagination)
  .get("/authors/:id", AuthorController.listAuthorById)
  .post("/authors", AuthorController.createAuthor)
  .put("/authors/:id", AuthorController.updateAuthor)
  .delete("/authors/:id", AuthorController.deleteAuthor);

export default router;
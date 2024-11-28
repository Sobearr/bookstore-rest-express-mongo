import express from "express";
import LivroController from "../controller/livroController.js";
import pagination from "../middlewares/pagination.js";

const router = express.Router();

router
  .get("/livros", LivroController.listLivros, pagination)
  .get("/livros/search", LivroController.listLivroByFilter, pagination)
  .get("/livros/:id", LivroController.listLivroById)
  .post("/livros", LivroController.createLivro)
  .put("/livros/:id", LivroController.updateLivro)
  .delete("/livros/:id", LivroController.deleteLivro);

export default router;
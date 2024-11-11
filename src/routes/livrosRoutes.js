import express from "express";
import LivroController from "../controller/livroController.js";

const router = express.Router();

router
  .get("/livros", LivroController.listLivros)
  .get("/livros/search", LivroController.listLivroByPublisher)
  .get("/livros/:id", LivroController.listLivroById)
  .post("/livros", LivroController.createLivro)
  .put("/livros/:id", LivroController.updateLivro)
  .delete("/livros/:id", LivroController.deleteLivro);

export default router;
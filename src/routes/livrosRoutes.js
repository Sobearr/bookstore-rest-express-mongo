import express from "express";
import LivroController from "../controller/livroController.js";

const routes = express.Router();

routes.get('/livros', LivroController.listLivros);
routes.get('/livros/:id', LivroController.listLivroById);
routes.post('/livros', LivroController.createLivro);
routes.put('/livros/:id', LivroController.updateLivro);
routes.delete('/livros/:id', LivroController.deleteLivro);

export default routes;
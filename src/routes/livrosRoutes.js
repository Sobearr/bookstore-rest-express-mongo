import express from "express";
import LivroController from "../controller/livroController.js";

const routes = express.Router();

routes.get('/livros', LivroController.listLivros);

export default routes;
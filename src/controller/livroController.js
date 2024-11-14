import NotFound from "../errors/NotFound.js";
import { livro } from "../models/index.js";

class LivroController {

  static listLivros = async (req, res, next) => {
    try {
      const livros = await livro.find()
        .populate("author")
        .exec();

      res.status(200).json(livros);
    } catch (error) {
      next(error);
    }
  };

  static listLivroById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const foundLivro = await livro.findById(id)
        .populate("author", "nome")
        .exec();

      if (foundLivro !== null) {
        res.status(200).json(foundLivro);
      } else {
        next(new NotFound("Book ID not found"));
      }
    } catch (error) {
      next(error);
    }
  };

  static createLivro = async (req, res, next) => {
    try {
      let livroNew = new livro(req.body);

      const livroResultado = await livroNew.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static updateLivro = async (req, res, next) => {
    try {
      const id = req.params.id;            
      const livroFound = await livro.findByIdAndUpdate(id, { $set: req.body});
      
      if (livroFound !== null) {
        res.status(200).send({ message: "Book updated"});
      } else {
        next(new NotFound("Book ID not found"));
      }
    } catch (error) {
      next(error);
    }
  };

  static deleteLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroFound = await livro.findByIdAndDelete(id);
      
      if (livroFound !== null) {
        res.status(200).send({ message: "Book deleted."});
      } else {
        next(new NotFound("Book ID not found"));
      }
    } catch (error) {
      next(error);
    }
  };

  static listLivroByPublisher = async (req, res, next) => {
    const publisher = req.query.publi;
    try {
      const livrosByPublisher = await livro.find({ publisher: publisher });
      res.status(200).send(livrosByPublisher);
    } catch (error) {
      next(error);
    }
  };

};

export default LivroController;

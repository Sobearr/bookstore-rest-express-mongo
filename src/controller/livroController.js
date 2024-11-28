import NotFound from "../errors/NotFound.js";
import { author, livro } from "../models/index.js";

class LivroController {

  static listLivros = async (req, res, next) => {
    try {
      const getBooks = livro.find();

      req.result = getBooks;

      next();
    } catch (error) {
      next(error);
    }
  };

  static listLivroById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const foundLivro = await livro
        .findById(id, {}, { autopopulate: false })
        .populate("author");

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

  static listLivroByFilter = async (req, res, next) => {
    try {
      const search = await processSearch(req.query);
      
      if (search !== null) {
        const livrosResult = livro.find(search);

        req.result = livrosResult;
  
        next();
      } else {
        res.status(200).send([]);
      }
    } catch (error) {
      next(error);
    }
  };

}

async function processSearch(parames) {
  const { publisher, title, minPages, maxPages, authorName } = parames;

  let search = {};

  if (publisher) search.publisher = publisher;
  if (title) search.title = { $regex: title, $options: "i" };

  if (minPages || maxPages) search.pages = {};
  if (minPages) search.pages.$gte = minPages;
  if (maxPages) search.pages.$lte = maxPages;

  if (authorName) {
    const foundAuthor = await author.findOne({ name: authorName });

    if (foundAuthor !== null) {
      search.author = foundAuthor._id;
    } else {
      search = null;
    }
    
  }

  return search;
}

export default LivroController;

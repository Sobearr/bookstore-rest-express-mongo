import BadRequestError from "../errors/BadRequestError.js";
import NotFound from "../errors/NotFound.js";
import { author, livro } from "../models/index.js";

class LivroController {

  static listLivros = async (req, res, next) => {
    try {
      let { limit = 5, page = 1} = req.query;

      limit = parseInt(limit);
      page = parseInt(page);

      if (limit > 0 && page > 0) {
        const livros = await livro.find()
          .skip((page - 1) * limit)
          .limit(limit)
          .populate("author")
          .exec();

        res.status(200).json(livros);
      } else {
        next(new BadRequestError());
      }
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

  static listLivroByFilter = async (req, res, next) => {
    try {
      const search = await processSearch(req.query);
      
      if (search !== null) {
        const livrosResult = await livro
          .find(search)
          .populate("author");
  
        res.status(200).send(livrosResult);
      } else {
        res.status(200).send([]);
      }
    } catch (error) {
      next(error);
    }
  };

}

async function processSearch(parames) {
  const { publisher, title, minPaginas, maxPaginas, authorName } = parames;

  let search = {};

  if (publisher) search.publisher = publisher;
  if (title) search.title = { $regex: title, $options: "i" };

  if (minPaginas || maxPaginas) search.pages = {};
  if (minPaginas) search.pages.$gte = minPaginas;
  if (maxPaginas) search.pages.$lte = maxPaginas;

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

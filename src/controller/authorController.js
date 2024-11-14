import NotFound from "../errors/NotFound.js";
import { author } from "../models/index.js";

class AuthorController {

  static listAuthors = async (req, res, next) => {
    try {
      const authors = await author.find({});
      res.status(200).json(authors);
    } catch (error) {
      next(error);
    }
  };

  static listAuthorById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const foundAuthor = await author.findById(id);

      if (foundAuthor !== null) {
        res.status(200).send(foundAuthor);
      } else {
        next(new NotFound("Author ID not found"));
      }

    } catch (error) {
      next(error);
    }
  };

  static createAuthor = async (req, res, next) => {
    try {
      let authorNew = new author(req.body);
      const authorResult = await authorNew.save();
      res.status(201).send(authorResult.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static updateAuthor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const foundAuthor = await author.findByIdAndUpdate(id, req.body);
      if (foundAuthor !== null) {
        res.status(200).send({ message: "Author updated"});
      } else {
        next(new NotFound("Author ID not found"));
      }
      
    } catch (error) {
      next(error);
    }
  };

  static deleteAuthor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const foundAuthor = await author.findByIdAndDelete(id);
      if (foundAuthor !== null) {
        res.status(200).send({ message: "Author deleted."});
      } else {
        next(new NotFound("Author ID not found"));
      }
      
    } catch (error) {
      next(error);
    }
  };

};

export default AuthorController;

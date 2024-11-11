import author from "../models/Author.js";

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
        res.status(404).send({ message: "Author ID not found" });
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
      await author.findByIdAndUpdate(id, req.body);
      res.status(200).send({ message: "Author updated"});
    } catch (error) {
      next(error);
    }
  };

  static deleteAuthor = async (req, res, next) => {
    try {
      const id = req.params.id;
      await author.findByIdAndDelete(id);
      res.status(200).send({ message: "Author deleted."});
    } catch (error) {
      next(error);
    }
  };

};

export default AuthorController;

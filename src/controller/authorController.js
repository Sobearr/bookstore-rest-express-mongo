import mongoose from "mongoose";
import author from "../models/Author.js";

class AuthorController {

  static listAuthors = async (req, res) => {
    try {
      const authors = await author.find({});
      res.status(200).json(authors);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Internal server error` });
    }
  };

  static listAuthorById = async (req, res) => {
    try {
      const id = req.params.id;
      const foundAuthor = await author.findById(id);

      if (foundAuthor !== null) {
        res.status(200).send(foundAuthor);
      } else {
        res.status(404).send({ message: "Author ID not found" });
      }

    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: "Incorrect data format provided" });
      } else {
        res.status(500).send({ message: "Internal server error"});
      }
    }
  };

  static createAuthor = async (req, res) => {
    try {
      let authorNew = new author(req.body);
      const authorResult = await authorNew.save();
      res.status(201).send(authorResult.toJSON());
    } catch (error) {
      res.status(500).json({ message: `${error.message} - failed to create author` });
    }
  };

  static updateAuthor = async (req, res) => {
    try {
      const id = req.params.id;
      await author.findByIdAndUpdate(id, req.body);
      res.status(200).send({ message: "Author updated"});
    } catch (error) {
      res.status(500).send({ message: `${error.message} - author update error` });
    }
  };

  static deleteAuthor = async (req, res) => {
    try {
      const id = req.params.id;
      await author.findByIdAndDelete(id);
      res.status(200).send({ message: "Author deleted."});
    } catch (error) {
      res.status(500).send({ message: `${error.message} - author delete error` });
    }
  };

};

export default AuthorController;

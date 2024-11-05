import { author } from "../models/Author.js";

class AuthorController {

    static async listAuthors(req, res) {
        try {
            const authors = await author.find({});
            res.status(200).json(authors);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - request error` });
        }
    }

    static async listAuthorById(req, res) {
        try {
            const id = req.params.id;
            const foundAuthor = await author.findById(id);
            res.status(200).json(foundAuthor);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - author request error` });
        }
    }

    static async createAuthor(req, res) {
        try {
            const newAuthor = await author.create(req.body);
            res.status(201).json({ message: "Created successfully", author: newAuthor });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - failed to create author` });
        }
    }

    static async updateAuthor(req, res) {
        try {
            const id = req.params.id;
            await author.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: 'Author updated'});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - author update error` });
        }
    }

    static async deleteAuthor(req, res) {
        try {
            const id = req.params.id;
            await author.findByIdAndDelete(id);
            res.status(200).json({ message: 'Author deleted.'});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - author delete error` });
        }
    }

};

export default AuthorController;

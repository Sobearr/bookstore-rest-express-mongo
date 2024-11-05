import livro from "../models/Livro.js";
import { author } from "../models/Author.js";

class LivroController {

    static async listLivros(req, res) {
        try {
            const livros = await livro.find({});
            res.status(200).json(livros);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - request error` });
        }
    }

    static async listLivroById(req, res) {
        try {
            const id = req.params.id;
            const foundLivro = await livro.findById(id);
            res.status(200).json(foundLivro);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - book request error` });
        }
    }

    static async createLivro(req, res) {
        const newLivro = req.body;
        try {
            const authorFound = await author.findById(newLivro.author);
            const livroComplete = { ...newLivro, author: { ...authorFound._doc }};
            const livroCreated = await livro.create(livroComplete);
            res.status(201).json({ message: "Created successfully", livro: livroCreated });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - failed to create livro` });
        }
    }

    static async updateLivro(req, res) {
        try {
            const id = req.params.id;
            if (req.body.author) {
                const authorFound = await author.findById(req.body.author);
                req.body.author = { ...authorFound._doc};
                await livro.findByIdAndUpdate(id, req.body);
            } else {
                await livro.findByIdAndUpdate(id, req.body);
            }
            
            res.status(200).json({ message: 'Book updated'});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - book update error` });
        }
    }

    static async deleteLivro(req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndDelete(id);
            res.status(200).json({ message: 'Book deleted.'});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - book update error` });
        }
    }

};

export default LivroController;

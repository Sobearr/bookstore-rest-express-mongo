import livro from "../models/Livro.js";

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
        try {
            const newLivro = await livro.create(req.body);
            res.status(201).json({ message: "Created successfully", livro: newLivro });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - failed to create livro` });
        }
        
    }

};

export default LivroController;

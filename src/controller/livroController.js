import livro from "../models/Livro.js";

class LivroController {

    static async listLivros(req, res) {
        const livros = await livro.find({});
        res.status(200).json(livros);
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

import livro from "../models/Livro.js";

class LivroController {

    static async listLivros(req, res) {
        const livros = await livro.find({});
        res.status(200).json(livros);
    }

};

export default LivroController;

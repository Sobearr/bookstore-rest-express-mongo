import livro from "../models/Livro.js";

class LivroController {

  static async listLivros(req, res) {
    try {
      const livros = await livro.find()
        .populate("author")
        .exec();

      res.status(200).json(livros);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - request error` });
    }
  }

  static async listLivroById(req, res) {
    try {
      const id = req.params.id;
      const foundLivro = await livro.findById(id)
        .populate("author", "nome")
        .exec();

      res.status(200).json(foundLivro);
    } catch (error) {
      res.status(400).send({ message: `${error.message} - Book not found` });
    }
  }

  static async createLivro(req, res) {
    try {
      let livroNew = new livro(req.body);

      const livroResultado = await livroNew.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (error) {
      res.status(500).json({ message: `${error.message} - failed to create livro` });
    }
  }

  static async updateLivro(req, res) {
    try {
      const id = req.params.id;            
      await livro.findByIdAndUpdate(id, { $set: req.body});
            
      res.status(200).send({ message: "Book updated"});
    } catch (error) {
      res.status(500).send({ message: `${error.message} - book update error` });
    }
  }

  static async deleteLivro(req, res) {
    try {
      const id = req.params.id;
      await livro.findByIdAndDelete(id);
      res.status(200).send({ message: "Book deleted."});
    } catch (error) {
      res.status(500).send({ message: `${error.message} - book update error` });
    }
  }

  static async listLivroByPublisher(req, res) {
    const publisher = req.query.publi;
    try {
      const livrosByPublisher = await livro.find({ publisher: publisher });
      res.status(200).send(livrosByPublisher);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - search error` });
    }
  }

};

export default LivroController;

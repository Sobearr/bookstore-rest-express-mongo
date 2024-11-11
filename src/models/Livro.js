import mongoose from "mongoose";
// import { authorSchema } from './Author.js';

const livroSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  title: { type: String, required: [true, "The book's title is required"] },
  publisher: { type: String, required: [true, "The publisher's name is required"] },
  price: { type: Number },
  pages: { type: Number },
  // author: authorSchema
  author: { type: mongoose.Schema.Types.ObjectId, ref: "authors", required: [true, "The author's name is required"] }
}, { versionKey: false });

const livro = mongoose.model("livros", livroSchema);

export default livro;

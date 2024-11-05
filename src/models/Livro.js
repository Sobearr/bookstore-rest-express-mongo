import mongoose from "mongoose";
import { authorSchema } from './Author.js';

const livroSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String, required: true },
    publisher: { type: String },
    price: { type: Number },
    pages: { type: Number },
    author: authorSchema
}, { versionKey: false });

const livro = mongoose.model('livros', livroSchema);

export default livro;

import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const livroSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  title: {
    type: String,
    required: [true, "The book's title is required"]
  },
  publisher: {
    type: String,
    required: [true, "The publisher's name is required"],
    enum: {
      values: ["Allen", "Allen & Unwin", "Penguin Classics"],
      message: "The publisher {VALUE} is not allowed"
    }
  },
  price: { type: Number },  
  pages: {
    type: Number,
    validate: {
      validator: (value) => {
        return value >=10 && value <= 5000;
      },
      message: "Page number must be between 10 and 5000. Value inserted: {VALUE}"
    },
    required: [true, "Page number required"]
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "authors",
    required: [true, "The author's name is required"],
    autopopulate: { select: "name"}
  }
}, { versionKey: false });

livroSchema.plugin(autopopulate);
const livro = mongoose.model("livros", livroSchema);

export default livro;

import mongoose, { Schema } from 'mongoose';

const BookSchema = new Schema({
  title: String,
  author: String,
  summary: String,
  isbn: String,
  genre: String,
  uri: String
});

const Book = mongoose.model('Book', BookSchema);

export default Book;

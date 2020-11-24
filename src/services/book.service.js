import Book from '../models/book';

export default class BookService {
  constructor(debug) {
    this.debug = debug;
  }

  async findBook(isbn) {
    const result = await Book.findOne({ isbn });
    return result;
  }

  async createBook(book) {
    const newBook = await book.save();
    return newBook;
  }

  async updateBook(book) {
    const bookToUpdate = await Book.findOneAndUpdate({ isbn: book.isbn }, book, { useFindAndModify: false });
    return bookToUpdate;
  }

  async deleteBook(isbn) {
    const bookToDelete = await Book.findOneAndDelete({ isbn }, { useFindAndModify: false });
    return bookToDelete;
  }

  async allBooks() {
    const books = await Book.find({});
    return books;
  }
}

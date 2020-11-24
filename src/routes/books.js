import { Router } from 'express';
import BookService from '../services/book.service';

import Book from '../models/book';

export default function bookRouter(debug) {
  const router = new Router();
  const bookService = new BookService(debug);

  router.get('/', async (req, res) => {
    debug.info(`Trying to fetch all book records from database from ${req.ip}`);
    try {
      const books = await bookService.allBooks();
      if (books) {
        debug.printSuccess(`${req.method} ${req.originalUrl} ${req.ip}`);
        res.status(200).send(books).end();
      } else {
        debug.printError(`${req.method} ${req.originalUrl} ${req.ip} books table is empty`);
        res.status(404).end();
      }
    } catch (err) {
      debug.printError(err);
      res.status(500).send(err.message).end();
    }
  });

  router.post('/', async (req, res) => {
    debug.info(`Trying to store a new book record in db from ${req.ip}`);
    try {
      const record = await bookService.findBook(req.body.isbn);
      if (record) {
        debug.printWarning(
          `${req.method} ${req.originalUrl} ${req.ip} Book with ISBN: ${req.body.isbn} Already Exists.`
        );
        res.status(204).end();
      } else {
        const book = new Book(req.body);
        const bookRecord = await bookService.createBook(book);
        debug.printSuccess(`${req.method} ${req.originalUrl} ${req.ip}`);
        res.status(200).send(bookRecord).end();
      }
    } catch (err) {
      debug.printError(err);
      res.status(500).send(err.message).end();
    }
  });

  router.get('/:isbn', async (req, res) => {
    const { isbn } = req.params;
    debug.info(`Trying to find a book record in db with isbn #${isbn}`);
    try {
      const record = await bookService.findBook(isbn);
      if (record) {
        debug.printSuccess(`${req.method} ${req.originalUrl} ${req.ip}`);
        res.status(200).send(record).end();
      } else {
        debug.printError(`${req.method} ${req.originalUrl} ${req.ip} Book with ISBN# ${isbn} doesn't exist.`);
        res.status(404).end();
      }
    } catch (err) {
      debug.printError(err);
      res.status(500).send(err.message).end();
    }
  });

  router.put('/:isbn', async (req, res) => {
    const { isbn } = req.params;
    debug.printInfo(`Trying to update a book, ISBN# ${isbn}, record.`);
    try {
      const record = await bookService.updateBook(req.body);
      if (record) {
        debug.printSuccess(`${req.method} ${req.originalUrl} ${req.ip}`);
        res.status(200).send({ updated: true }).end();
      } else {
        debug.printError(`${req.method} ${req.originalUrl} ${req.ip} Book with ISBN# ${isbn} doesn't exist..`);
        res.status(404).end();
      }
    } catch (err) {
      debug.printError(err);
      res.status(500).send(err.message).end();
    }
  });

  router.delete('/:isbn', async (req, res) => {
    const { isbn } = req.params;
    debug.printInfo(`Trying to delete a book, ISBN# ${isbn}, record.`);
    try {
      const record = await bookService.deleteBook(isbn);
      if (record) {
        debug.printSuccess(`${req.method} ${req.originalUrl} ${req.ip}`);
        res.status(200).send({ deleted: true }).end();
      } else {
        debug.printError(`${req.method} ${req.originalUrl} ${req.ip} Book with ISBN# ${isbn} doesn't exist..`);
        res.status(404).end();
      }
    } catch (err) {
      debug.printError(err);
      res.status(500).send(err.message).end();
    }
  });

  return router;
}

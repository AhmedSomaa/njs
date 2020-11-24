import bookRouter from './books';
import API from '../config/apis';
import statusRouter from './status';

export default [
  {
    name: API.STATUS_URL,
    router(debug) {
      return statusRouter(debug);
    }
  },
  {
    name: API.BOOKS_URL,
    router(debug) {
      return bookRouter(debug);
    }
  }
];

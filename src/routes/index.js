import API from '../config/apis';
import statusRouter from './status';

export default [
  {
    name: API.STATUS_URL,
    router(logger, debug, timestamp) {
      return statusRouter(logger, debug, timestamp);
    }
  }
];

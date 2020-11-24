import { Router } from 'express';

export default function statusRouter(logger, debug) {
  const router = new Router();

  router.get('/', (req, res) => {
    debug.printSuccess(`${res.statusCode} ${req.method} ${req.originalUrl}`);
    res.send({ response: 'OK' });
  });

  return router;
}

import { Router } from 'express';

export default function statusRouter() {
  const router = new Router();

  router.get('/', (req, res) => {
    res.send({ response: 'OK' });
  });

  return router;
}

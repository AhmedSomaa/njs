import http from 'http';
import open from 'open';
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import API from '../config/apis';
import swaggerOptions from '../config/swagger';

export default class Server {
  constructor(port, host) {
    this.port = port;
    this.host = host;
    this.app = express();
    this.baseUrl = API.BASE_URL;
    this.swaggerSpecs = swaggerJsdoc(swaggerOptions);
  }

  setMiddlewares(middlewares) {
    middlewares.forEach((middleware) => this.app.use(middleware));
  }

  setApiRoutes(apiRoutes) {
    apiRoutes.forEach(({ name, router }) => this.app.use(`/${this.baseUrl}/${name}`, router));
  }

  setSwagger() {
    this.app.use('/', swaggerUi.serve, swaggerUi.setup(this.swaggerSpecs, { explorer: true }));
  }

  start() {
    const server = http.createServer(this.app);
    server.listen(this.port, this.host, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Server listening on port ${this.port}`);
        open(`http://localhost:${this.port}`, { app: 'chrome' });
      }
    });
  }
}

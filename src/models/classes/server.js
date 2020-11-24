// 3rd-party modules imports
import http from 'http';
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// custom modules imports
import Debug from './debug';
import API from '../../config/apis';
import logger from '../../middlewares/winston';
import swaggerOptions from '../../config/swagger';

export default class Server {
  constructor(port, host) {
    this.port = port;
    this.host = host;
    this.app = express();
    this.logger = logger;
    this.baseUrl = API.BASE_URL;
    this.debug = new Debug(this.logger);
    this.swaggerSpecs = swaggerJsdoc(swaggerOptions);
  }

  setMiddlewares(middlewares) {
    this.debug.printInfo('Trying to set application middlewares.', this.logger);
    try {
      middlewares.forEach((middleware) => this.app.use(middleware));
      this.debug.printSuccess('Application middlewares successfully set.', this.logger);
    } catch (err) {
      this.debug.printError(`Error setting application middlewares, ${err}`, this.logger);
    }
  }

  setApiRoutes(routes) {
    this.debug.printInfo('Trying to set application api routes.');
    try {
      routes.forEach(({ name, router }) => this.app.use(`/${this.baseUrl}/${name}`, router(this.logger, this.debug)));
      this.debug.printSuccess('Application api routes successfully set.');
    } catch (err) {
      this.debug.printError(`Error setting application api routes, ${err}`);
    }
  }

  setSwagger() {
    this.debug.printInfo('Trying to set swagger docs.');
    try {
      this.app.use('/', swaggerUi.serve, swaggerUi.setup(this.swaggerSpecs, { explorer: true }));
      this.debug.printSuccess('Swagger docs successfully set.');
    } catch (err) {
      this.debug.printError(`Error setting swagger docs, ${err}`);
    }
  }

  start() {
    this.debug.printInfo(`Trying to create an http server.`);
    try {
      const server = http.createServer(this.app);
      this.debug.printSuccess('Successfully create an http server.');
      server.listen(this.port, this.host, (error) => {
        this.debug.printInfo(`Express Server trying to listen on localhost:${this.port}.`);
        if (error) {
          this.debug.printError(`Express Server couldn't listen on localhost:${this.port}, ${error}`);
        } else {
          this.debug.printSuccess(
            `** Express Server is listening on localhost:${this.port}, open your browser on http://localhost:${this.port}`
          );
        }
      });
    } catch (err) {
      this.debug.printError(`Error create an http server, ${err}`);
    }
  }
}

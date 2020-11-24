// 3rd-party modules imports
import http from 'http';
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// custom modules imports
import Debug from './debug';
import db from '../config/db';
import API from '../config/apis';
import logger from '../middlewares/winston';
import swaggerOptions from '../config/swagger';
import MongooseService from '../services/mongoose';

export default class Server {
  constructor(port, host) {
    this.port = port;
    this.host = host;
    this.app = express();
    this.logger = logger;
    this.baseUrl = API.BASE_URL;
    this.debug = new Debug(this.logger);
    this.swaggerSpecs = swaggerJsdoc(swaggerOptions);
    this.mongoose = new MongooseService(db.DB_URL, db.OPTIONS);
  }

  setMiddlewares(middlewares) {
    if (middlewares) {
      this.debug.printInfo('Trying to set application middlewares.');
      try {
        middlewares.forEach((middleware) => this.app.use(middleware));
        this.debug.printSuccess('Application middlewares successfully set.');
      } catch (err) {
        this.debug.printError(`Error setting application middlewares, ${err}`);
      }
    } else {
      this.debug.printError('Middlewares array is empty.');
    }
  }

  setApiRoutes(routes) {
    if (routes) {
      this.debug.printInfo('Trying to set application api routes.');
      try {
        routes.forEach(({ name, router }) => this.app.use(`/${this.baseUrl}/${name}`, router(this.debug)));
        this.debug.printSuccess('Application api routes successfully set.');
      } catch (err) {
        this.debug.printError(`Error setting application api routes, ${err}`);
      }
    } else {
      this.debug.printError('routes array is empty.');
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

  async connectToDB() {
    this.debug.printInfo('Trying to connect to db.');
    try {
      this.db = await this.mongoose.connect();
      this.debug.printSuccess('Express Server successfully connected to db');
    } catch (err) {
      this.debug.printError('Express Server failed to connect to db.');
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

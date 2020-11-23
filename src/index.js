// 3rd-party imports
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';

// custom imports
import API from './config/apis';
import Server from './models/server';
import corsOptions from './config/cors';
import statusRouter from './routes/status';

// application middlewares
const middlewares = [
  compression(),
  morgan('dev'),
  cors(corsOptions),
  bodyParser.json({ limit: '20mb' }),
  bodyParser.urlencoded({ extended: true })
];

// application routes
const routes = [{ name: API.STATUS_URL, router: statusRouter() }];

// create new application
const application = new Server(3000, 'localhost');

// set application middlewares
application.setMiddlewares(middlewares);

// set api endpoints routes
application.setApiRoutes(routes);

// set swagger docs
application.setSwagger();

// start server
application.start();

import routes from './routes';
import Server from './classes/server';
import middlewares from './middlewares';

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

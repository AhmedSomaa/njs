import routes from './routes';
import middlewares from './middlewares';
import Server from './classes/server';

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

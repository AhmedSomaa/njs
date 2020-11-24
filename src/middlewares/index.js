// 3rd-party modules imports
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';

// custom modules imports
import logger from './winston';
import corsOptions from '../config/cors';

export default [
  compression(),
  morgan('combined', { stream: logger.stream.write }),
  cors(corsOptions),
  bodyParser.json({ limit: '20mb' }),
  bodyParser.urlencoded({ extended: true })
];

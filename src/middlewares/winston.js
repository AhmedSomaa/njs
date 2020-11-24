import winston, { format } from 'winston';
import options from '../config/winston';

const logger = winston.createLogger({
  levels: options.levels,
  format: format.combine(format.timestamp(), format.json()),
  transports: [new winston.transports.File(options.file)],
  exitOnError: false
});

export default logger;

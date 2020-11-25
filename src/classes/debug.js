import chalk from 'chalk';
import moment from 'moment';

export default class Debug {
  constructor(logger) {
    this.logger = logger;
    this.info = chalk.hex('458588');
    this.error = chalk.hex('cc241d');
    this.debug = chalk.hex('98971a');
    this.warning = chalk.hex('d79921');
    this.timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
  }

  printInfo(msg) {
    this.logger.info(msg);
    console.log(this.info(`${this.timestamp} [INFO] ${msg}`));
  }

  printSuccess(msg) {
    this.logger.info(msg);
    console.log(this.debug(`${this.timestamp} [DEBUG] ${msg}`));
  }

  printError(msg) {
    this.logger.error(msg);
    console.log(this.error(`${this.timestamp} [ERROR] ${msg}`));
  }

  printWarning(msg) {
    this.logger.warn(msg);
    console.log(this.warning(`${this.timestamp} [WARNING] ${msg}`));
  }
}

import chalk from 'chalk';
import moment from 'moment';

export default class Debug {
  constructor(logger) {
    this.logger = logger;
    this.infoMsg = chalk.blue;
    this.errorMsg = chalk.red;
    this.successMsg = chalk.green;
    this.warningMsg = chalk.yellow;
    this.info = chalk.white.bgBlue.bold;
    this.error = chalk.white.bgRed.bold;
    this.warning = chalk.white.bgYellow.bold;
    this.success = chalk.white.bgGreen.bold;
    this.timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
  }

  printInfo(msg) {
    this.logger.info(msg);
    console.log(this.info(`${this.timestamp} [INFO]`), this.infoMsg(msg));
  }

  printSuccess(msg) {
    this.logger.info(msg);
    console.log(this.success(`${this.timestamp} [SUCC]`), this.successMsg(msg));
  }

  printError(msg) {
    this.log.error(msg);
    console.log(this.error(`${this.timestamp} [FAIL]`), this.errorMsg(msg));
  }

  printWarning(msg) {
    this.logger.warn(msg);
    console.log(this.warning(`${this.timestamp} [WARN]`), this.warningMsg(msg));
  }
}

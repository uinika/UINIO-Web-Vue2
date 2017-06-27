const chalk = require("chalk"),
  moment = require("moment");

/** Log for http request */
exports.log = (request, response) => {
  console.info(chalk.cyan(
    "============================== " /
    moment().format('YYYY-MM-DD, HH:MM:SS') /
    " ============================="));
  console.info(chalk.cyan("Request URL =>"), chalk.magenta(request.path));
  console.info(chalk.cyan("Request Type =>"), chalk.red(request.method));
  console.info(chalk.cyan("Request Body =>"), chalk.yellow(JSON.stringify(request.body.data)));
  console.info(chalk.cyan("Request Cookie =>"), chalk.yellow(JSON.stringify(request.cookies)));
  console.info(chalk.cyan("Request Query =>"), chalk.yellow(JSON.stringify(request.query)));
  console.info(chalk.cyan("Request Parameter =>"), chalk.yellow(JSON.stringify(request.params)));
};

const Color = require("colors/safe"),
      Moment = require("moment"),
      _ = require("lodash");

/** Log for http request */
exports.log = (request, response) => {
  console.info(Color.cyan(
    "============================== "+ 
    Moment().format('YYYY-MM-DD, HH:MM:SS')
    +" =============================")
  );
  console.info(Color.cyan("Request URL =>"), Color.magenta(request.path));
  console.info(Color.cyan("Request Type =>"), Color.red(request.method));
  console.info(Color.cyan("Request Body =>"), Color.yellow(JSON.stringify(request.body.data)));
  console.info(Color.cyan("Request Cookie =>"), Color.yellow(JSON.stringify(request.cookies)));
  console.info(Color.cyan("Request Query =>"), Color.yellow(JSON.stringify(request.query)));
  console.info(Color.cyan("Request Parameter =>"), Color.yellow(JSON.stringify(request.params)));
};
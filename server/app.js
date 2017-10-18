const express = require('express'),
  app = express(),
  cors = require('cors'),
  chalk = require('chalk'),
  base = require('../config/base'),
  bodyParser = require('body-parser'),
  logger = require('./common/logger.js');

// base config
const Uri = base.server.uri;
const Port = base.server.port;

/** test server for build folder */
app.use('/build', express.static('./build'));

/** express middleware */
app.use(cors({
  origin: '*',
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 1728000
}));
app.use(bodyParser.json());
app.use('/', (request, response, next) => {
  logger(request, response);
  next();
});

/** server & handler */
const server = app.listen(Port, () => {
  console.info(
    chalk.yellow.bgBlue('express-mock-server started on http://localhost:' + Port + Uri)
  );
});
const handler = () => {
  server.close(() => {
    console.info(
      chalk.white.bgRed('express-mock-server closed on http://localhost:' + Port + Uri)
    );
  });
};
process.on('SIGTERM', handler);
process.on('SIGINT', handler);

/** custom routers */
app.use(Uri, require('./login/api'));
app.use(Uri, require('./system/api'));

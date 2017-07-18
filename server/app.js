const express = require("express"),
  app = express(),
  cors = require("cors"),
  chalk = require("chalk"),
  base = require("../config/base"),
  bodyParser = require("body-parser"),
  logger = require("./common/logger.js");

/** Test server for build folder */
app.use("/build", express.static("./build"));

/** Express middleware */
app.use(cors({
  origin: "*",
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  maxAge: 1728000
}));
app.use(bodyParser.json());
app.use("/", (request, response, next) => {
  logger(request, response);
  next();
});

/** Server & handler */
const server = app.listen(base.server, () => {
  console.info(
    chalk.yellow.bgBlue("express-mock-server started on http://localhost:" + base.server + "/mock")
  );
});
const handler = () => {
  server.close(() => {
    console.info(
      chalk.white.bgRed("express-mock-server closed on http://localhost:" + base.server + "/mock")
    );
  });
};
process.on("SIGTERM", handler);
process.on("SIGINT", handler);

/** Custom routers */
app.use("/", require("./login/api"));
app.use("/", require("./system/api"));

const express = require("express"),
  app = express(),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  logger = require("./common/logger.js"),
  chalk = require("chalk");

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
const port = 5000;
const server = app.listen(port, () => {
  console.info(
    chalk.yellow.bgBlue("express-mock-server started on http://localhost:" + port + "/")
  );
});
const handler = () => {
  server.close(() => {
    console.info(
      chalk.white.bgRed("express-mock-server closed on http://localhost:" + port + "/")
    );
  });
};
process.on("SIGTERM", handler);
process.on("SIGINT", handler);

/** Custom routers */
app.use("/", require("./login/api"));
app.use("/", require("./system/api"));

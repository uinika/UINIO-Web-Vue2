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

const server = app.listen(6200, () => {
  console.info("START");
});

process.on("SIGINT", function () {
  server.close(() => {
    console.info("CLOSE");
  });
});

/** Custom routers */
app.use("/", require("./login/api"));

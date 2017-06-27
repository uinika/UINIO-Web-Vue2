const express = require("express"),
  app = express(),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  Middleware = require("./common/middleware.js"),
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
  Middleware.log(request, response);
  next();
});

app.listen(6000);

/** Custom routers */
app.use("/", require("./login/api"));

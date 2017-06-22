const Express = require("express"),
  App = Express(),
  Cors = require("cors"),
  BodyParser = require("body-parser"),
  Middleware = require("./common/middleware.js"),
  Color = require("colors/safe");

/** Middlewares */
App.use("/build", Express.static("./build"));

App.use(Cors({
  origin: "*",
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  maxAge: 1728000
}));
App.use(BodyParser.json());
App.use("/", (request, response, next) => {
  Middleware.log(request, response);
  next();
});
App.listen(7000);

/* Informations */
console.info(Color.blue("Livereload  started on http://localhost:5008"));

/** Routers */
App.use("/", require("./login/api"));


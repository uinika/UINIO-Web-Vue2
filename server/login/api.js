const router = require("express").Router(),
      util = require("../common/util.js");
      _ = require("lodash");

router.route("/login")
  .post(function(request, response) {
    response.json(util.json("login/data/login.json"));
});

module.exports = router;

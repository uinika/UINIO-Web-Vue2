const router = require('express').Router(),
  util = require('../common/util.js');

router.route('/login')
  .post(function (request, response) {
    response.json(util.json('/login/data/login.json'));
  });

module.exports = router;

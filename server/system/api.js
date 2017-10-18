const router = require('express').Router(),
  util = require('../common/util.js');

router.route('/sys/logs')
  .get(function (request, response) {
    response.json(util.json('/system/data/logs.json'));
  });

module.exports = router;

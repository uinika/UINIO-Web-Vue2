const jsonfile = require('jsonfile'),
  path = require('path');

/** Basic path */
exports.url = url => {
  return __dirname + url
};

/** Json loader */
exports.json = name => {
  return jsonfile.readFileSync(
    path.resolve(__dirname, '..') + name
  );
};

/** Protocal between server & client */
exports.protocol = (head, body) => {
  head = head || {};
  body = body || {};
  return {
    'head': {
      'status': head.status || '',
      'token': head.token || '',
      'message': head.message || '',
      'total': head.total || ''
    },
    'body': body || ''
  }
};

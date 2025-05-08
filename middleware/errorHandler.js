const { logEvents } = require('./logEvents');

const errorHandler = function (err, req, req, next) {
  logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
  console.log(err.stack);
  res.status(500).send(err.message);
};

module.exports = errorHandler;

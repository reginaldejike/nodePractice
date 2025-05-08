//Cross Origin Resourse Sharing
const allowedOrigins = require('../config/allowedOrigins');

const corsOptions = (req, res, next) => {
  const origin = req.header.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', true);
  }

  next();
};

module.exports = corsOptions;

//Cross Origin Resourse Sharing
const whitelist = [
  'https://www.yoursite.com',
  'http://127.0.0.1:5500',
  'http://localhost:5000',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionSuccessStatus: 200,
};

module.exports = corsOptions;

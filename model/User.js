const mongoos = require('mongoose');
const Schema = mongoos.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    User: {
      type: Number,
      default: 2001,
    },
    Editor: Number,
    Admin: Number,
  },

  password: {
    type: String,
    required: true,
  },
  refreshToken: String,
});

module.exports = mongoos.model('User', userSchema);

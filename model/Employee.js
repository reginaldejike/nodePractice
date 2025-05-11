const mongoos = require('mongoose');
const Schema = mongoos.Schema;

const employeeSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
});

module.exports = mongoos.model('Employee', employeeSchema);

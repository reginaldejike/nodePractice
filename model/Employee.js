const mongoos = require('mongoose');
const schema = mongoos.Schema;

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

const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesController');
const ROLE_LIST = require('../../config/roles_list');
const verityRoles = require('../../middleware/verifyRoles');

router
  .route('/')
  .get(employeesController.getAllEmployees)
  .post(
    verityRoles(ROLE_LIST.Admin, ROLE_LIST.Editor),
    employeesController.createNewEmployee
  )
  .put(
    verityRoles(ROLE_LIST.Admin, ROLE_LIST.Editor),
    employeesController.updateEmployee
  )
  .delete(verityRoles(ROLE_LIST.Admin), employeesController.deleteEmployee);

router.route('/:id').get(employeesController.getEmployee);
module.exports = router;

const express = require('express');
const router = express.Router();

const Validations = require('../middleware/validations')

const adminController = require('../controllers/Admin-controller');


// http://localhost:8000/admin-profile
router.post('/create', Validations.validate('register'), adminController.create);
router.get('/:id',Validations.validate('id'), adminController.show);
router.get('/admins/getAll',Validations.validate('id'), adminController.index);
router.post('/destroy/:id', adminController.destroy);
router.post('/amend/:id',Validations.validate('register'), adminController.amend);

module.exports = router;
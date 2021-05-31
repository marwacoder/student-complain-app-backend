const express = require('express');
const router = express.Router();

const Validations = require('../middleware/validations')

const lecturerController = require('../controllers/lecturer-controller');


// http://localhost:8000/admin-profile
router.post('/create', Validations.validate('register'), lecturerController.create);
router.get('/:id',Validations.validate('id'), lecturerController.show);
router.get('/Record/all',Validations.validate('id'), lecturerController.index);
router.post('/destroy/:id', lecturerController.destroy);
router.post('/amend/:id',Validations.validate('register'), lecturerController.amend);

module.exports = router;
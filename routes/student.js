const express = require('express');
const router = express.Router();

const Validations = require('../middleware/validations')

const studentController = require('../controllers/student-controller');


// http://localhost:8000/admin-profile
router.post('/create', Validations.validate('register'), studentController.create);
router.get('/:id',Validations.validate('id'), studentController.show);
router.get('/students/getAll',Validations.validate('id'), studentController.index);
router.post('/destroy/:id', studentController.destroy);
router.post('/amend/:id',Validations.validate('register'), studentController.amend);

module.exports = router;
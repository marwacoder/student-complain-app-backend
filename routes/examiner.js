const express = require('express');
const router = express.Router();

const Validations = require('../middleware/validations')

const examinerController = require('../controllers/examiner-controller');


// http://localhost:8000/admin-profile
router.post('/create', Validations.validate('register'), examinerController.create);
router.get('/:id',Validations.validate('id'), examinerController.show);
router.get('/examiners/getAll',Validations.validate('id'), examinerController.index);
router.post('/destroy/:id', examinerController.destroy);
router.post('/amend/:id',Validations.validate('register'), examinerController.amend);

module.exports = router;
const express = require('express');
const router = express.Router();

const Validations = require('../middleware/validations')

const courseController = require('../controllers/course-controller');


// http://localhost:8000/course
router.post('/', Validations.validate('register'), courseController.create);
router.get('/course/:id',Validations.validate('id'), courseController.show);
router.get('/getAll', Validations.validate('id'), courseController.index);
router.post('/destroy/:id', courseController.destroy);
router.post('/amend/:id',Validations.validate('register'), courseController.amend);

module.exports = router;
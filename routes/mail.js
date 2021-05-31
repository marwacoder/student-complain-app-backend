const express = require('express');
const router = express.Router();

const Validations = require('../middleware/validations')

const emailController = require('../controllers/email-controller');


// http://localhost:8000/admin-profile
router.post('/studentToExaminer', Validations.validate('register'), emailController.examinerInbox);
router.post('/examinerToStudent', Validations.validate('register'), emailController.examinerSent);
router.post('/lecturerToStudent', Validations.validate('register'), emailController.lecturerSent);
router.post('/studentToLecturer', Validations.validate('register'), emailController.lecturerInbox);
router.get('/examinerInbox', Validations.validate('register'), emailController.getExaminerInbox);
router.get('/lecturerInbox/:id', Validations.validate('register'), emailController.getLecturerInbox);
router.get('/show1/:id', Validations.validate('id'), emailController.show1);
router.get('/show2/:id', Validations.validate('id'), emailController.show2);
router.get('/show3', Validations.validate('id'), emailController.show3);
router.get('/show4', Validations.validate('id'), emailController.show4);
router.get('/students/getAll',Validations.validate('id'), emailController.index);
router.post('/destroy/:id', emailController.destroyExaminerOrLecturerSent);
router.post('/destroy1/:id', emailController.destroyExaminerOrLecturerInbox);
// router.post('/amend/:id',Validations.validate('register'), emailController.amend);

module.exports = router;
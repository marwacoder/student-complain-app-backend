const express = require('express');
const router = express.Router();

const Validations = require('../middleware/validations')

const userController = require('../controllers/user-controller');


// http://localhost:8000/register

router.post('/login', userController.auth);
router.post('/amend/:id',  userController.amend);

module.exports = router;
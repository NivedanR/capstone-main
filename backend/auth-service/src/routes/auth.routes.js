const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');
const validate = require('../validators/auth.validator');

router.post('/register', validate.register, register);
router.post('/login', validate.login, login);

module.exports = router;
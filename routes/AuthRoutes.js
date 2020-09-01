const express = require('express');
const authControllers = require('../controllers/AuthControllers');
const User = require('../models/User');

const router = express.Router();

router.post('/login', authControllers.login);
router.post('/refresh', authControllers.refreshTokenVerify);
router.post('/register', authControllers.createUser);

module.exports = router;
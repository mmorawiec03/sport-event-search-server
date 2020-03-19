const express = require('express');
const authControllers = require('../controllers/AuthControllers');
const User = require('../models/User');

const router = express.Router();

router.post('/login', authControllers.login);
router.post('/refresh', authControllers.refreshTokenVerify);
router.post('/register', authControllers.createUser);
//router.post('/logout', authControllers.logout);

// temporary
router.get('/users', authControllers.accessTokenVerify, (req, res, next) => {
    User.find({}).then((events) => {
        res.send(events);
    });
});

module.exports = router;
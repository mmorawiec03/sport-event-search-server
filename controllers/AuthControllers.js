const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../Config');


const validateEmail = (email) => {
    return User.findOne({
        email: email
    }).then((result) => {
        return !result;
    });
}

exports.createUser = (req, res, next) => {
    validateEmail(req.body.email).then((valid) => {
        if (valid) {
            User.create({
                fullName: req.body.fullName,
                email: req.body.email,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber
            }, (err, result) => {
                if (err) {
                    next(error);
                } else {
                    res.json({
                        message: 'User created. Go to the login page and sign in.'
                    });
                }
            });
        } else {
            res.status(409).send({
                message: 'This email is already in use.'
            });
        }
    });
}

exports.login = (req, res, next) => {
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err || !user) {
            res.status(401).send({
                message: 'Invalid email or password.'
            });
            next(err);
        } else {
            if (req.body.password === user.password) {
                res.json(user); //generateTokens(req, user)
            } else {
                res.status(401).send({
                    message: 'Invalid email or password.'
                });
            }
        }
    });
}

// for future
const generateTokens = (req, user) => {
    const ACCESS_TOKEN = jwt.sign({
        sub: user._id,
        rol: user.role,
        type: 'ACCESS_TOKEN'
    }, config.TOKEN_SECRET_JWT, {
        expiresIn: 120
    });
    const REFRESH_TOKEN = jwt.sign({
        sub: user._id,
        rol: user.role,
        type: 'REFRESH_TOKEN'
    }, config.TOKEN_SECRET_JWT, {
        expiresIn: 480
    });
    return {
        accessToken: ACCESS_TOKEN,
        refreshToken: REFRESH_TOKEN
    }
}

exports.accessTokenVerify = (req, res, next) => {
    if (!req.headers.authorization) { 
        return res.status(401).send({ 
            error: 'Token is missing' 
        }); 
    }
    const AUTHORIZATION_TOKEN = req.headers.authorization.split(' ');
    if (AUTHORIZATION_TOKEN[0] !== 'Bearer') { 
        return res.status(401).send({ 
            error: "Token is not complete" 
        });
    }
    jwt.verify(AUTHORIZATION_TOKEN[1], config.TOKEN_SECRET_JWT, (err) => { 
        if (err) {
            return res.status(401).send({ 
                error: "Token is not valid" 
            });
        } 
        next(); 
    });
}

exports.refreshTokenVerify = (req, res, next) => { 
    if (!req.body.refreshToken) { 
        res.status(401).send({ 
            message: "Refresh token is missing" 
        });
    } 
    const REFRESH_TOKEN = req.body.refreshToken.split(' ');
    if (REFRESH_TOKEN[0] !== 'Bearer') { 
        return res.status(401).send({ 
            error: "Token is not complete" 
        });
    } 
    jwt.verify(REFRESH_TOKEN[1], TOKEN_SECRET_JWT, (err, payload) => { 
        if (err) { 
            return res.status(401).send({ 
                error: "Token refresh is not valid" 
            });
        }
        User.findById(payload.sub, (err, user) => { 
            if (!user) { 
                return res.status(401).send({ 
                    error: 'User not found' 
                });
            }
            return res.json(generateTokens(req, user)); 
        });
    });
}
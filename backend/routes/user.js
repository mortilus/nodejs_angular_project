const express = require("express");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
const User = require('../models/user');
const checkAuth = require('../middleware/check-auth');

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: 'User created!',
                        result: result
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        message: 'Email already token!'
                    });
                });
        });
});
router.post("/login", (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'Email not found!'
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password); //password passed in the request //password of the found user
        })
        .then(result => {
            if(!result) {
                return res.status(401).json({
                    message: 'Authorisation failed!'
                });
            }
            const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id }, 'my_secret', { expiresIn: '1h' });
            res.status(201).json({
                message: 'Login successfull',
                token: token
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Authorisation failed with some errors!'
            });
        });
});
router.get("/verify-token", checkAuth, (req, res, next) => {
    res.status(201).json({
        message: 'Valid token!'
    });
});

module.exports = router;
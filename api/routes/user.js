const express = require('express');
const router = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


const User = require('../../models/user');

router.get('/', (req, res, next) => {
    User.find().select('_id email password')
        .exec()
        .then(users => {
            const response = {
                count: users.length,
                users: users.map((user) => {
                    return {
                        email: user.email,
                        _id: user._id,
                        request: {
                            type: 'DELETE',
                            url: 'http://localhost:3000/users/delete/' + user._id
                        }
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.post('/signup', (req, res, next) => {

    //Search user to unique the email address
    User.find({email: req.body.email}).exec().then((responseUser) => {
        if (responseUser.length >= 1) {
            return res.status(422).json({
                message: 'User Exists'
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    user.save().then((result) => {
                        return res.status(201).json({
                            message: 'User created',
                        })
                    }).catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        })
                    });
                }
            });
        }
    });
});


router.post('/login', (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(users => {
            if (users.length < 1)
                return res.status(401).json({
                    message: 'Auth failed'
                });

            bcrypt.compare(req.body.password, users[0].password, (err, response) => {
                if (err)
                    return res.status(401).json({
                        message: 'Auth Failed'
                    });
                if (response) {
                    const token = jwt.sign({
                            email: users[0].email,
                            id: users[0]._id
                        }, process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: 'Auth Successful',
                        token: token
                    });
                }
                return res.status(401).json({
                    message: 'Auth Failed'
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});


router.delete('/:userId', (req, res, next) => {
    User.remove({_id: req.params.userId}).exec().then((response) => {
        res.status(200).json({
            message: 'User Deleted'
        })
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    });
});


module.exports = router;
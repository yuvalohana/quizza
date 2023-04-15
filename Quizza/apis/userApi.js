const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.get('/user/:name', function (req, res) {
    User.findOne({ userName: req.params.name }).exec(function (err, user) {
        if (err) res.status(500).send(err);
        else if (user) res.send(user);
        else User.create({ userName: req.params.name, quizzes: [] }).then(function (u, error) {
            if (error) res.status(500).send(error);
            else res.send(u);
        })
    })
})

router.post('/user/addQuiz/:userId', function (req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { "$push": { "quizzes": req.body } }, { new: true }, (err, result) => {
        if (err) res.status(500).send(err);
        else res.send(result);
    })
})

router.get('/user/quizzes/:quizId', function (req, res) {
    User.find({ "quizzes.qID": req.params.quizId }, (err, result) => {
        if (err) {
            res.status(500).send(err);
        }
        else res.send(result);
    })
})

module.exports = router;
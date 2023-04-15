const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require("path")

const quizApi = require('./apis/quizApi');
const userApi = require('./apis/userApi');

const SERVER_PORT = 8080;

mongoose.connect(process.env.CONNECTION_STRING || 'mongodb://localhost/quizza', () => {
    console.log('Connection to DB established');
});

app.listen(process.env.PORT || SERVER_PORT, () => {
    console.log('Server started')
});

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next();
});

app.use(express.static('build'));
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(quizApi);
app.use(userApi);


app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './build/index.html'), function (err) {
        if (err) {
            res.status(500).send(err)
        }
    })
})
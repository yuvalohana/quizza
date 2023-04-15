const mongoose = require('mongoose');
const answerSchema = require('./answerModel');
const Schema = mongoose.Schema;

const questionSchema = new Schema ({
    text: String,
    answers: [answerSchema]
})

module.exports = questionSchema;
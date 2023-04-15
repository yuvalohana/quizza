const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema ({
    text: String,
    score: Number
})

module.exports = answerSchema;
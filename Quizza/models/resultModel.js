const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = new Schema ({
    score: Number,
    title: String,
    desc: String
})

module.exports = resultSchema;
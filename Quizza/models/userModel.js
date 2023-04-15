const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    userName: String,
    quizzes: [{
        qID: { type: Schema.Types.ObjectId, ref: 'quiz'}, 
        score: Number
    }]
})

const User = mongoose.model('user', userSchema);
module.exports = User;
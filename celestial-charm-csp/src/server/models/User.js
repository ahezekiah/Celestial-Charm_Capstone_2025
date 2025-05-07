const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    phoneNumber: String,
    birthday: Date,
    email: { type: String, unique: true, required: true },
    uid: String
});

module.exports = mongoose.model('User', userSchema);
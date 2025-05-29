const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    phoneNumber: {type: Number, required: true, unique: true},
    birthday: {type: Date, required: true, unique: true},
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
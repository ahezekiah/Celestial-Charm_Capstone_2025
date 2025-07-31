const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    phoneNumber: {type: String, required: true },
    birthday: {type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    profilePicture: { type: String, required: false, default: null },
    gems: { type: Number, default: 0 }, 
    personalityType: { type: String, default: '' }
});

module.exports = mongoose.model('User', userSchema);
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    username: { type: String, required: true },
    phoneNumber: String,
    birthday: Date,
    email: { type: String, unique: true, required: true },
    uid: String
});

export default mongoose.model('User', userSchema);
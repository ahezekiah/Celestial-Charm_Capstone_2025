import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    phoneNumber: String,
    birthday: Date,
    email: { type: String, unique: true, required: true },
    uid: { type: String, required: true }
});

export default mongoose.model('User', userSchema);
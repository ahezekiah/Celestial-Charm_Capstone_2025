import mongoose from 'mongoose';
import { authConn } from '../db/connections.js';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, unique: true, required: true, trim: true },
    phoneNumber: {type: String, required: false },
    birthday: {type: String, required: false },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, select: false },
    profilePicture: { type: String, required: false, default: null },
    gems: { type: Number, default: 0 }, 
    personalityType: { type: String, default: '' },

    inventory: [{
        itemId: { type: String },
        name: { type: String },
        image: { type: String },
        priceGems: { type: Number },
        purchasedAt: { type: Date, default: Date.now }
    }],
}, { collection: 'users', timestamps: true });

export default authConn.models.User || authConn.model('User', userSchema);
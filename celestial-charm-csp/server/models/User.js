import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { authConn } from '../db/connections.js';

const userSchema = new mongoose.Schema({
    name: { type: String, trim: true, default: "" },
    username: { type: String, unique: true, required: true, trim: true },
    email: { type: String, unique: true, required: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    phoneNumber: { type: String, default: "" },
    birthday: { type: String, default: "" },
    profilePicture: { type: String, default: "" },
    gems: { type: Number, default: 0 },
    personalityType: { type: String, default: "" },
    // inventory: { type: [mongoose.Schema.Types.Mixed], default: [{
    //     itemId: { type: String },
    //     name: { type: String },
    //     image: { type: String },
    //     priceGems: { type: Number },
    //     purchasedAt: { type: Date, default: Date.now }
    // }] },

    inventory: [{
        itemId: String, name: String, image: String,
        priceGems: Number, qty: { type: Number, default: 1 },
        purchasedAt: { type: Date, default: Date.now }
    }],
    cart: [{ itemId: String, qty: { type: Number, default: 1 } }],
    wishlist: [{ itemId: String }],
    gemTransactions: { type: Array, default: [] },
}, { collection: 'users', timestamps: true });

userSchema.methods.comparePassword = async function (plain) {
    return bcrypt.compare(plain, this.password);
};

export default authConn.models.User || authConn.model('User', userSchema);
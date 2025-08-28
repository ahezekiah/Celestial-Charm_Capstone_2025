import { Schema, Model } from 'mongoose';

const userSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    phoneNumber: {type: String, required: true },
    birthday: {type: String, required: true },
    email: { type: String, unique: true, required: true },
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
}, { timestamps: true });

export default Model('User', userSchema);
import { model, Schema } from 'mongoose';
// import { model } from '../config/secondDb.js';

const animeProductSchema = new Schema({
    type: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    desc: { type: String, required: true },
    url: { type: String, required: true },
    image: { type: String, required: true }
}, { timestamps: true });

export default model('product-items', animeProductSchema, 'anime');

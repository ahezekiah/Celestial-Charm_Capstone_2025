import mongoose from 'mongoose';
import { productItemsConn } from '../db/connections.js';

const ProductItemSchema = new mongoose.Schema({
    type: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    desc: { type: String, required: true },
    url: { type: String, required: true },
    image: { type: String, required: true }
}, { collection: 'kpop' });

export default productItemsConn.models.KpopProduct
    || productItemsConn.model('KpopProduct', ProductItemSchema, 'kpop');

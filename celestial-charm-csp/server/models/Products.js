import mongoose from 'mongoose';
import { productsConn } from '../db/connections.js';

const CollectionProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    theme: { type: String, required: true },
    price: { type: String, required: true },
    desc: { type: String, required: true },
    url: { type: String, required: true },
    image: { type: String, required: true }
}, { collection: 'collection_products' });


export default productsConn.models.CollectionProduct
    || productsConn.model('CollectionProduct', CollectionProductSchema, 'collection_products');

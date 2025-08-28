import { Schema } from 'mongoose';
import { model } from '../config/thirdDb'; // Import the third database connection

const ProductsSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    theme: { type: String, required: true },
    price: { type: String, required: true },
    desc: { type: String, required: true },
    url: { type: String, required: true },
    image: { type: String, required: true }
}, { timestamps: true });


export default model('Products', ProductsSchema, 'collection_products'); // Use the third connection to create the model

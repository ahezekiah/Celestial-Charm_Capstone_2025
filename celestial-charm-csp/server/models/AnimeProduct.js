import mongoose from "mongoose";
import { productItemsConn } from "../db/connections";

const ProductItemSchema = new mongoose.Schema({
    type: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    desc: { type: String, required: true },
    url: { type: String, required: true },
    image: { type: String, required: true }
}, { collection: 'anime' });

export default productItemsConn.models.AnimeProduct
    || productItemsConn.model('AnimeProduct', ProductItemSchema, 'anime');

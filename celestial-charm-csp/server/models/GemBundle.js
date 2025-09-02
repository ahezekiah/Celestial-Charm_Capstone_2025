import mongoose from "mongoose";
import { gemBundlesConn } from "../db/connections.js";

const gemBundleSchema = new mongoose.Schema({
    id:        { type: String, required: true, unique: true, index: true }, // e.g. "boost-100"
    title:     { type: String, required: true },
    emoji:     { type: String, default: "💎" },
    costGems:  { type: Number, required: true, min: 1 },
    giveGems:  { type: Number, required: true, min: 1 },
    blurb:     { type: String, default: "" },
    active:    { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 }
}, { timestamps: true, collection: 'gem_bundles' });

export default gemBundlesConn.models.GemBundle
    || gemBundlesConn.model('GemBundle', gemBundleSchema, 'gem_bundles');

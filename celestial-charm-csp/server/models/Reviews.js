import { Schema, model } from 'mongoose';

const reviewSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    userName: { type: String, required: true },
    targetType: { type: String, enum: ['product', 'blog', 'site'], required: true, index: true },
    targetId: { type: String, default: null, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    title: { type: String, maxLength: 120 },
    body: { type: String, maxLength: 1000, required: true },
    helpful: { type: Number, default: 0 },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending', index: true },
}, { timestamps: true });
export default model('Review', reviewSchema);
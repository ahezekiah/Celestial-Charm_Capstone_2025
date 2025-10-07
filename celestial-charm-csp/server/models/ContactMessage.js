import { model, Schema } from 'mongoose';

const ContactMessageSchema = new Schema({
    name: String,
    email: String,
    subject: String,
    message: String
}, { timestamps: true });
export default model('ContactMessage', ContactMessageSchema);
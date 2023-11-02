import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
    user: { type: String, required: true },
    message: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Messages', messageSchema);
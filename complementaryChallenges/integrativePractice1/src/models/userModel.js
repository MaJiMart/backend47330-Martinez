import mongoose, { Schema } from 'mongoose';

const Address = new Schema({
    street: { type: String },
    number: { type: Number },
    city: { type: String },
    country: { type: String },
}, { _id: false })

const userSchema = new Schema({
    fullname: { type: String, required:true },
    email: { type: String, required:true, unique:true },
    age: { type: Number, required:true },
    address: { type: Address, default:{} },
    status: { type: String, default: 'active', enum: ['active', 'inactive'] }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
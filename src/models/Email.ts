import mongoose from 'mongoose';

const EmailSchema = new mongoose.Schema({
    to: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
});

export default mongoose.model('Email', EmailSchema);
const mongoose = require('mongoose');
const Schema=mongoose.Schema

const otpSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    code: { type: String, required: true },
    expiresAt: { type: Date, required: true },
});

module.exports = mongoose.model('otp', otpSchema);

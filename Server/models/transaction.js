const mongoose = require('mongoose');
const User=require('./user')
const Seller=require('./seller')
const Product=require('./product')
const Schema = mongoose.Schema;

// Transaction Schema
const transactionSchema = new Schema({
    transactionId: { type: String, required: true, unique: true }, // Unique transaction identifier
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true }, 
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    amount: { type: Number, required: true }, 
    paymentMethod: { type: String, enum: ['Credit Card', 'PayPal', 'UPI', 'Bank Transfer'], required: true }, 
    status: { type: String, enum: ['Pending', 'Completed', 'Failed', 'Refunded'], required: true },
    items: [
        {
            itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            itemName: { type: String }, 
            quantity: { type: Number }, 
            price: { type: Number } 
        }
    ],
    transactionDate: { type: Date, default: Date.now }, 
    notes: { type: String },
}, {
    timestamps: true 
});

module.exports = mongoose.model('Transaction', transactionSchema);

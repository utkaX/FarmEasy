const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User schema (buyer)
        required: true
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User schema (seller)
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product', // Reference to the Product schema
                required: true
            },
            quantityOrdered: {
                type: Number,
                required: true,
                min: 1 // Ensures at least one product is ordered
            },
            price: {
                type: Number,
                required: true,
                min: 0 // Price of the product
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },
    shippingAddress: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['credit card', 'google pay', 'bank transfer'],
        required: true
    },
    expectedDeliveryDate: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);

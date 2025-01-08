const mongoose = require('mongoose');
const Schema=mongoose.Schema

const productSchema = new Schema(
    {
        sellerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User schema (Seller)
            required: true,
        },
        productName: {
            type: String,
            required: true,
            trim: true,
        },
        productType: {
            type: String,
            required: true,
            trim: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 0, // Ensures no negative quantity
        },
        pricePerUnit: {
            type: Number,
            required: true,
            min: 0, // Ensures no negative price
        },
        description: {
            type: String,
            trim: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['available', 'out of stock'],
            default: 'available',
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        dateAdded: {
            type: Date,
            default: Date.now,
        },
        tags: {
            type: [String], // Array of strings for search tags
        },
        unitsSold: {
            type: Number,
            default: 0,
            min: 0,
        }
    },
    { timestamps: true } 
);

module.exports = mongoose.model('Product', productSchema);

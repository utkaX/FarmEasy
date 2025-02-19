const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sellerSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },

    // Step 1: Business Information
    businessInfo: {
        businessName: { type: String, required: true },
        gstNumber: { type: String, required: true }, 
        businessCategory: { type: String, enum: ['Retail', 'Wholesale', 'Service'], required: true },  // Type of business
        completed: { type: Boolean, default: false }, // Status for this step
        businessEmail: { type: String, required: true, trim: true },

    },

    // Step 2: Contact Information
    contactInfo: {
        contactNumber: { type: String, required: true },
        businessEmail: { type: String, required: true },
        businessAddress: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zipCode: { type: String, required: true },
        },
        completed: { type: Boolean, default: false }, 
    },

    // Step 3: Business Profile (Logo, Social Media)
    businessProfile: {
        logo: { type: String }, // URL or path to business logo
        websiteUrl: { type: String }, 
        socialMediaLinks: {
            facebook: { type: String },
            twitter: { type: String },
            instagram: { type: String },
        },
        completed: { type: Boolean, default: false }, 
    },

    // Overall Completion Status
    isProfileComplete: { type: Boolean, default: false }, // True if all steps are completed

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Seller', sellerSchema);

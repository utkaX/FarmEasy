const mongoose = require('mongoose');
const Schema=mongoose.Schema

const farmerSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },

    // Step 1: Personal Details
    personalDetails: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        dateOfBirth: { type: Date },
        contactNumber: { type: String, required: true },
        address: {
            street: { type: String },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zipCode: { type: String, required: true },
        },
        completed: { type: Boolean, default: false }, 
    },

    // Step 2: Farm Details
    farmDetails: {
        farmName: { type: String, required: true },
        farmLocation: { type: String, required: true },
        farmSize: { type: Number, required: true }, // Size in acres or hectares
        farmType: { type: String, enum: ['organic', 'conventional', 'mixed'], required: true },
        cropsGrown: [{ type: String }], 
        livestock: [{ type: String }], 
        completed: { type: Boolean, default: false }, 
    },

    // Step 3: Resource Accessibility
    resourceAccessibility: {
        accessToWater: { type: String, enum: ['adequate', 'limited', 'scarce'], required: true },
        electricityAvailability: { type: Boolean, default: false }, // Whether electricity is available for farming
        accessToFarmingTools: [{ type: String }], // List of tools they currently have access to
        completed: { type: Boolean, default: false }, // Status for this step
    },

    // Overall Completion Status
    isProfileComplete: { type: Boolean, default: false }, 
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Farmer', farmerSchema);

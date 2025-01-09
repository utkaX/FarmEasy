const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Crop Schema
const cropSchema = new Schema({
    cropname: { type: String, required: true },  
    farmerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Farmer', required: true },  
    quantity: { type: Number, required: true },  
    unit: { type: String, required: true },  // Unit of measurement (e.g., Kg, Tons)
    plantedDate: { type: Date, required: true },  
    harvestDate: { type: Date },  
    growthStatus: {
        type: String,
        enum: ['Planted', 'Growing', 'Harvested', 'Sold', 'Failed'],  
        default: 'Planted'
    },
    pestsOrDiseases: {
        type: String,
        default: null,  
    }
}, {
    timestamps: true 
});

// Export the Crop model
module.exports = mongoose.model('Crop', cropSchema);

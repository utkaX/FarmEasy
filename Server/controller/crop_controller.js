const Crop = require('../models/crop');  // Import Crop model

// Create a new crop
exports.createCrop = async (req, res) => {
    const { cropname, farmerID, quantity, unit, plantedDate, harvestDate, growthStatus, pestsOrDiseases, imageUrls } = req.body;

    try {
        // Create a new crop using the request body data
        const crop = new Crop({
            cropname,
            farmerID,
            quantity,
            unit,
            plantedDate,
            harvestDate,
            growthStatus,
            pestsOrDiseases,
            imageUrls  // Add the imageUrls field
        });

        // Save the crop to the database
        await crop.save();

        // Respond with the created crop
        res.status(201).json({ message: 'Crop created successfully', crop });
    } catch (error) {
        console.error("Error creating crop: ", error);
        res.status(400).json({ error: error.message });
    }
};

// Get all crops
exports.getAllCrops = async (req, res) => {
    try {
        // Fetch all crops from the database
        const crops = await Crop.find();

        // Respond with the list of crops
        res.status(200).json(crops);
    } catch (error) {
        console.error("Error fetching crops: ", error);
        res.status(400).json({ error: error.message });
    }
};

// Get a crop by ID
exports.getCropById = async (req, res) => {
    const { id } = req.params;  // Get crop ID from the URL params

    try {
        // Find the crop by ID
        const crop = await Crop.findById(id);
        if (!crop) {
            return res.status(404).json({ error: 'Crop not found' });
        }

        // Respond with the crop details
        res.status(200).json(crop);
    } catch (error) {
        console.error("Error fetching crop: ", error);
        res.status(400).json({ error: error.message });
    }
};

// Update a crop by ID
exports.updateCropById = async (req, res) => {
    const { id } = req.params;  // Get crop ID from the URL params
    const { cropname, quantity, unit, plantedDate, harvestDate, growthStatus, pestsOrDiseases, imageUrls } = req.body;

    try {
        // Find the crop by ID
        const crop = await Crop.findById(id);
        if (!crop) {
            return res.status(404).json({ error: 'Crop not found' });
        }

        // Update fields if they are provided in the request body
        if (cropname) crop.cropname = cropname;
        if (quantity) crop.quantity = quantity;
        if (unit) crop.unit = unit;
        if (plantedDate) crop.plantedDate = plantedDate;
        if (harvestDate) crop.harvestDate = harvestDate;
        if (growthStatus) crop.growthStatus = growthStatus;
        if (pestsOrDiseases) crop.pestsOrDiseases = pestsOrDiseases;
        if (imageUrls) crop.imageUrls = imageUrls;  // Update imageUrls if provided

        // Save the updated crop to the database
        await crop.save();

        // Respond with the updated crop
        res.status(200).json({ message: 'Crop updated successfully', crop });
    } catch (error) {
        console.error("Error updating crop: ", error);
        res.status(400).json({ error: error.message });
    }
};

// Delete a crop by ID
exports.deleteCropById = async (req, res) => {
    const { id } = req.params;  // Get crop ID from the URL params

    try {
        // Find the crop by ID and delete it
        const crop = await Crop.findByIdAndDelete(id);
        if (!crop) {
            return res.status(404).json({ error: 'Crop not found' });
        }

        // Respond with a success message
        res.status(200).json({ message: 'Crop deleted successfully' });
    } catch (error) {
        console.error("Error deleting crop: ", error);
        res.status(400).json({ error: error.message });
    }
};

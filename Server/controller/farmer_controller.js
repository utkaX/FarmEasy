const Farmer = require('../models/farmer'); // Assuming your schema is in models/farmer.js

// Create a new farmer profile
exports.createFarmer = async (req, res) => {
    try {
        const farmerData = req.body;
        const farmer = new Farmer(farmerData);

        await farmer.save();
        res.status(201).json({ message: 'Farmer profile created successfully', farmer });
    } catch (error) {
        console.error("Error creating farmer profile:", error);
        res.status(400).json({ error: error.message });
    }
};

// Get all farmer profiles
exports.getAllFarmers = async (req, res) => {
    try {
        const farmers = await Farmer.find();
        res.status(200).json(farmers);
    } catch (error) {
        console.error("Error fetching farmers:", error);
        res.status(500).json({ error: 'An error occurred while fetching farmer profiles.' });
    }
};

// Get a single farmer profile by ID
exports.getFarmerById = async (req, res) => {
    try {
        const farmer = await Farmer.findById(req.params.id);

        if (!farmer) {
            return res.status(404).json({ error: 'Farmer profile not found' });
        }

        res.status(200).json(farmer);
    } catch (error) {
        console.error("Error fetching farmer profile:", error);
        res.status(500).json({ error: 'An error occurred while fetching the farmer profile.' });
    }
};

// Update a farmer profile by ID
exports.updateFarmerById = async (req, res) => {
    try {
        const farmer = await Farmer.findById(req.params.id);
        console.log(farmer)

        if (!farmer) {
            return res.status(404).json({ error: 'Farmer profile not found' });
        }

        Object.assign(farmer, req.body); // Merge the updated fields
        farmer.updatedAt = Date.now(); // Update the timestamp
        await farmer.save();

        res.status(200).json({ message: 'Farmer profile updated successfully', farmer });
    } catch (error) {
        console.error("Error updating farmer profile:", error);
        res.status(400).json({ error: error.message });
    }
};

// Delete a farmer profile by ID
exports.deleteFarmerById = async (req, res) => {
    try {
        const farmer = await Farmer.findByIdAndDelete(req.params.id);

        if (!farmer) {
            return res.status(404).json({ error: 'Farmer profile not found' });
        }

        res.status(200).json({ message: 'Farmer profile deleted successfully' });
    } catch (error) {
        console.error("Error deleting farmer profile:", error);
        res.status(500).json({ error: 'An error occurred while deleting the farmer profile.' });
    }
};

// Mark a step as completed
exports.markStepComplete = async (req, res) => {
    try {
        const farmer = await Farmer.findById(req.params.id);

        if (!farmer) {
            return res.status(404).json({ error: 'Farmer profile not found' });
        }

        const { step } = req.body; // e.g., "personalDetails", "farmDetails", "resourceAccessibility"
        if (farmer[step]) {
            farmer[step].completed = true;

            // Check if all steps are completed
            farmer.isProfileComplete =
                farmer.personalDetails.completed &&
                farmer.farmDetails.completed &&
                farmer.resourceAccessibility.completed;

            farmer.updatedAt = Date.now();
            await farmer.save();

            res.status(200).json({ message: `${step} marked as complete`, farmer });
        } else {
            res.status(400).json({ error: `Invalid step: ${step}` });
        }
    } catch (error) {
        console.error("Error marking step as complete:", error);
        res.status(500).json({ error: 'An error occurred while updating the profile.' });
    }
};

const Seller = require('../models/seller'); // Import Seller schema

// Create or Update Seller Profile in a Single Step
exports.createSellerProfile = async (req, res) => {
    try {
        const sellerData = req.body;
        const seller = new Seller(sellerData);
        await seller.save();
        res.status(201).json({ message: "Seller profile created successfully!", seller });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};




// Get Seller Profile by User ID
exports.getSellerProfile = async (req, res) => {
    const { userId } = req.params;  // Extract userId from the URL

    try {
        const sellerProfile = await Seller.findOne({ userId });

        if (!sellerProfile) {
            return res.status(404).json({ error: 'Seller profile not found' });
        }

        res.status(200).json(sellerProfile);
    } catch (error) {
        console.error('Error fetching seller profile:', error);
        res.status(400).json({ error: error.message });
    }
};


// Get All Seller Profiles
exports.getAllSellerProfiles = async (req, res) => {
    try {
        const sellers = await Seller.find(); // Retrieve all sellers

        if (sellers.length === 0) {
            return res.status(404).json({ message: 'No seller profiles found' });
        }

        res.status(200).json(sellers); // Return all seller profiles
    } catch (error) {
        console.error('Error fetching seller profiles:', error);
        res.status(500).json({ error: 'An error occurred while fetching seller profiles' });
    }
};


// Update Seller Profile by User ID
exports.updateSellerProfileByUserId = async (req, res) => {
    
    const userId  = req.params.id;  // Extract userId from the URL
    console.log(userId)
    const updatedData = req.body;  // Data sent to update the profile

    try {
        const sellerProfile = await Seller.findOne({ userId });
        console.log(sellerProfile)
        if (!sellerProfile) {
            return res.status(404).json({ error: 'Seller profile not found' });
        }

        // Update the seller profile with new data
        Object.assign(sellerProfile, updatedData);

        await sellerProfile.save();

        res.status(200).json({ message: 'Seller profile updated successfully', sellerProfile });
    } catch (error) {
        console.error('Error updating seller profile:', error);
        res.status(400).json({ error: error.message });
    }
};


// Delete Seller Profile by User ID
exports.deleteSellerProfile = async (req, res) => {
    const userId = req.params.id;  // Extract userId from the URL

    try {
        const sellerProfile = await Seller.findOneAndDelete({ userId });

        if (!sellerProfile) {
            return res.status(404).json({ error: 'Seller profile not found' });
        }

        res.status(200).json({ message: 'Seller profile deleted successfully' });
    } catch (error) {
        console.error('Error deleting seller profile:', error);
        res.status(400).json({ error: error.message });
    }
};





// Check if the seller profile exists
exports.checkSellerProfile = async (req, res) => {
    const { userId } = req.params;

    try {
        const seller = await Seller.findOne({ userId }); // Ensure `userId` exists in Seller schema
        if (seller) {
            return res.json({ exists: true });
        }
        return res.json({ exists: false });
    } catch (error) {
        console.error("Error checking seller:", error);
        res.status(500).json({ message: "Server error" });
    }
}


exports.getSellerByUserId = async (req, res) => {
    try {
        const userId  = req.params.id; // Get userId from request parameters
        const seller = await Seller.findOne({ userId }); // Fetch seller details

        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        res.status(200).json(seller);
    } catch (error) {
        console.error('Error fetching seller:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

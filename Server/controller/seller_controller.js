const Seller = require('../models/seller'); // Import Seller schema

// Create or Update Seller Profile in a Single Step
exports.createSellerProfile = async (req, res) => {
    const { userId, businessName, gstNumber, businessCategory, contactNumber, businessEmail, businessAddress, logo, websiteUrl, socialMediaLinks } = req.body;

    try {
        let sellerProfile = await Seller.findOne({ userId });

        // If the seller profile doesn't exist, create a new one
        if (!sellerProfile) {
            sellerProfile = new Seller({ userId });
        }

        // Step 1: Business Information
        sellerProfile.businessInfo.businessName = businessName;
        sellerProfile.businessInfo.gstNumber = gstNumber;
        sellerProfile.businessInfo.businessCategory = businessCategory;
        sellerProfile.businessInfo.completed = true;  // Mark as completed for Step 1

        // Step 2: Contact Information
        sellerProfile.contactInfo.contactNumber = contactNumber;
        sellerProfile.contactInfo.businessEmail = businessEmail;
        sellerProfile.contactInfo.businessAddress = businessAddress;
        sellerProfile.contactInfo.completed = true;  // Mark as completed for Step 2

        // Step 3: Business Profile (Logo, Website URL, Social Media Links)
        sellerProfile.businessProfile.logo = logo;
        sellerProfile.businessProfile.websiteUrl = websiteUrl;
        sellerProfile.businessProfile.socialMediaLinks = socialMediaLinks;
        sellerProfile.businessProfile.completed = true;  // Mark as completed for Step 3

        // Finalize Profile if all steps are completed
        if (
            sellerProfile.businessInfo.completed &&
            sellerProfile.contactInfo.completed &&
            sellerProfile.businessProfile.completed
        ) {
            sellerProfile.isProfileComplete = true;  // Profile is complete
        }

        // Save the profile
        await sellerProfile.save();

        res.status(200).json({ message: 'Seller profile created/updated successfully', sellerProfile });
    } catch (error) {
        console.error('Error creating or updating seller profile:', error);
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
exports.updateSellerProfile = async (req, res) => {
    const { userId } = req.params;  // Extract userId from the URL
    const updatedData = req.body;  // Data sent to update the profile

    try {
        const sellerProfile = await Seller.findOne({ userId });

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
    const { userId } = req.params;  // Extract userId from the URL

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

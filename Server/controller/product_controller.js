const mongoose = require('mongoose');
const Product = require('../models/product');
const multer = require('multer');

// Configure Multer Storage for Cloudinary
// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'farm_products', // Cloudinary folder name
//         allowed_formats: ['jpg', 'png', 'jpeg']
//     }
// });

// const upload = multer({ storage: storage }).array('images', 5); // Max 5 images

// Create a product with image upload
exports.createProduct = async (req, res) => {
    try {
        // console.log("Incoming request body:", req.body);

        const { sellerId, productName, productType, quantity, pricePerUnit, description, status, category, tags, imageUrls } = req.body;
        
        if (!sellerId || !productName || !productType || !quantity || !pricePerUnit || !category || !imageUrls.length) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const product = new Product({
            sellerId,
            productName,
            productType,
            quantity,
            pricePerUnit,
            description,
            imageUrls,
            status,
            category,
            tags,
        });

        const savedProduct = await product.save();
        res.status(201).json({ message: "Product created successfully", product: savedProduct });
    } catch (error) {
        console.error("Error in createProduct:", error);
        res.status(500).json({ message: "Failed to create product", error: error.message });
    }
};




// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve products', error: error.message });
    }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve product', error: error.message });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Ensure that imageUrls is handled as an array
        if (updates.imageUrls && !Array.isArray(updates.imageUrls)) {
            updates.imageUrls = [updates.imageUrls];  // If it's not an array, convert it to one
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update product', error: error.message });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product', error: error.message });
    }
};

// Get products by seller
exports.getProductsBySeller = async (req, res) => {
    try {
        let  sellerId  = req.params.id;

        // ✅ Check if sellerId is valid
        if (!mongoose.isValidObjectId(sellerId)) {
            return res.status(400).json({ message: "Invalid seller ID format. Must be a 24-character ObjectId." });
        }

        const products = await Product.find({ sellerId });

        if (!products.length) {
            return res.status(404).json({ message: "No products found for this seller." });
        }

        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve products.", error: error.message });
    }
};


// Search products by name, category, or tags
exports.searchProducts = async (req, res) => {
    console.log("Searching products...");
    try {
        const { query } = req.query.q; // Access the 'query' parameter

        if (!query) {
            return res.status(400).json({ message: 'Search query is required' });
        }

        // Find products that match the query in their name, tags, or description
        const products = await Product.find({
            $or: [
                { productName: { $regex: query, $options: 'i' } },  // Case-insensitive search in productName
                { tags: { $in: [query] } },                         // Search in tags array
                { description: { $regex: query, $options: 'i' } }   // Case-insensitive search in description
            ]
        });

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: 'Failed to search products', error: error.message });
    }
};

const Product = require('../models/product');
const mongoose=require('mongoose')


exports.createProduct = async (req, res) => {
    try {
        const { sellerId, productName, productType, quantity, pricePerUnit, description, imageUrl, status, category, tags } = req.body;

        const product = new Product({
            sellerId,
            productName,
            productType,
            quantity,
            pricePerUnit,
            description,
            imageUrl,
            status,
            category,
            tags,
        });

        const savedProduct = await product.save();
        res.status(201).json({ message: 'Product created successfully', product: savedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create product', error: error.message });
    }
};


//  Get all products

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve products', error: error.message });
    }
};


//   Get a product by ID
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


//Get products by seller
exports.getProductsBySeller = async (req, res) => {
    try {
        const { sellerId } = req.params;

        // Convert sellerId to ObjectId (if it's not already)
        const sellerObjectId =new mongoose.Types.ObjectId(sellerId);

        const products = await Product.find({ sellerId: sellerId });

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found for this seller' });
        }

        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve products by seller', error: error.message });
    }
};


// Search products by name, category, or tags
exports.searchProducts = async (req, res) => {
    console.log("123")
    try {
        const { query } = req.query.q; // Access the 'query' parameter
        query="organic"
        console.log(query)
        // Ensure query is provided
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

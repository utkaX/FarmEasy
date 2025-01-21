const Transaction = require('../models/transaction'); // Adjust the path based on your project structure

// Create a new transaction
exports.createTransaction = async (req, res) => {
    try {
        const newTransaction = new Transaction(req.body);
        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all transactions
exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        console.log(transactions)
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single transaction by ID
exports.getTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findById(id);
        if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a transaction
exports.updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTransaction = await Transaction.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedTransaction) return res.status(404).json({ error: 'Transaction not found' });
        res.status(200).json(updatedTransaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTransaction = await Transaction.findByIdAndDelete(id);
        if (!deletedTransaction) return res.status(404).json({ error: 'Transaction not found' });
        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const express = require('express');
const Router = express.Router();



const  {
    createTransaction,
    getAllTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction
}= require('../controller/transaction_controller');




Router.post('/create', createTransaction); 
Router.get('/', getAllTransactions); 
Router.get('/:id', getTransactionById); 
Router.put('/update/:id', updateTransaction); 
Router.delete('/delete/:id', deleteTransaction);

module.exports = Router;

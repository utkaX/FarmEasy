const express=require('express')
const Router=express.Router()


const{
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductsBySeller,
    searchProducts
}=require('../controller/product_controller')

Router.get('/:id',getProductById)
Router.get('/',getAllProducts)
Router.post('/add',createProduct)
Router.put('/update/:id',updateProduct)
Router.delete('/delete/:id',deleteProduct)
Router.get('/seller/:id',getProductsBySeller)
Router.get('/search',searchProducts)

module.exports=Router
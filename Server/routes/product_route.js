const express=require('express')
const Router=express.Router()
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary.jsx')


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'farm_products',
        allowed_formats: ['jpg', 'png', 'jpeg']
    }
});

const upload = multer({ storage: storage });
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
Router.post('/add',upload.array('images', 5),createProduct)
Router.put('/update/:id',updateProduct)
Router.delete('/delete/:id',deleteProduct)
Router.get('/seller/:id',getProductsBySeller)
Router.get('/search',searchProducts)

module.exports=Router
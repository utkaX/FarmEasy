const express=require('express')
const Router=express.Router()



const{
    createCrop,
    getAllCrops,
    getCropById,
    updateCropById,
    deleteCropById
}=require('../controller/crop_controller')

Router.get('/',getAllCrops)
Router.post('/create',createCrop)
Router.get('/:id',getCropById)
Router.put('/update/:id',updateCropById)
Router.delete('/delete/:id',deleteCropById)

module.exports=Router
const express=require('express')
const Router=express.Router()

const{
    createSellerProfile,
getSellerProfile,
updateSellerProfileByUserId,
deleteSellerProfile,
getAllSellerProfiles,
checkSellerProfile,
getSellerByUserId
}=require('../controller/seller_controller')


Router.get('/:id',getSellerProfile)
Router.get('/',getAllSellerProfiles)
Router.post('/create',createSellerProfile)
Router.put('/update/:id',updateSellerProfileByUserId)
Router.delete('/delete/:id',deleteSellerProfile)
Router.get('/check/:id',checkSellerProfile)
Router.get('/getbyuser/:id',getSellerByUserId)

module.exports=Router
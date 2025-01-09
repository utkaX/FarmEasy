const express=require('express')
const Router=express.Router()

const{
createSellerProfile,
getSellerProfile,
updateSellerProfile,
deleteSellerProfile,
getAllSellerProfiles
}=require('../controller/seller_controller')


Router.get('/:id',getSellerProfile)
Router.get('/',getAllSellerProfiles)
Router.post('/create',createSellerProfile)
Router.put('/update/:id',updateSellerProfile)
Router.delete('/delete/:id',deleteSellerProfile)


module.exports=Router
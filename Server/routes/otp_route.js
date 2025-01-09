const express=require('express')
const router=express.Router()


const{
postOtp
}=require('../controller/otp_controller')

router.post('/:id',postOtp)

module.exports=router
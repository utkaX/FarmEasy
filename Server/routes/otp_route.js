const express=require('express')
const router=express.Router()


const{
requestOtp,
verifyOtp
}=require('../controller/otp_controller')


module.exports=router
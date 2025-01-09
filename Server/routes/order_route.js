const express=require('express')
const Router=express.Router()



const{
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder
}=require('../controller/order_controller')


Router.post('/create',createOrder)
Router.get('/',getAllOrders)
Router.get('/:id',getOrderById)
Router.put('/update/:id',updateOrderStatus)
Router.delete('/delete/:id',deleteOrder)


module.exports=Router
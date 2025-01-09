const Order=require('../models/order')
const User=require('../models/user')
const products=require('../models/product')

exports.createOrder = async (req, res) => {
    try {
        const { buyerId, sellerId, products, shippingAddress, paymentMethod, expectedDeliveryDate } = req.body;

        // Calculate total price
        const totalPrice = products.reduce((total, product) => total + product.quantityOrdered * product.price, 0);

        // Create a new order
        const order = new Order({
            buyerId,
            sellerId,
            products,
            totalPrice,
            shippingAddress,
            paymentMethod,
            expectedDeliveryDate
        });

        await order.save();

        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: error.message });
    }
};



exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            // .populate('buyerId', 'username email') // Populate buyer details
            // .populate('sellerId', 'username email') // Populate seller details
            // .populate('products.productId', 'name price'); // Populate product details

        res.status(200).json({ orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: error.message });
    }
};


exports.getOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findById(id)

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ order });
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: error.message });
    }
};


exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, paymentStatus } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status, paymentStatus },
            { new: true } // Return the updated document
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: error.message });
    }
};


exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedOrder = await Order.findByIdAndDelete(id);

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully', order: deletedOrder });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: error.message });
    }
};

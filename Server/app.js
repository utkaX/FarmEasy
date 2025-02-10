const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require("cors");


dotenv.config();

// Connect to MongoDB
connectDB();



const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => res.send('API is running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




const userRoute=require('./routes/user_route')
app.use('/user',userRoute)

const farmerRoute=require('./routes/farmer_route')
app.use('/farmer',farmerRoute)

const productRoute=require('./routes/product_route')
app.use('/product',productRoute)

const otpRoute=require('./routes/otp_route')
app.use('/otp',otpRoute)

const orderRoute=require('./routes/order_route')
app.use('/order',orderRoute)

const cropRoute=require('./routes/crop_route')
app.use('/crop',cropRoute)

const sellerRoute=require('./routes/seller_route')
app.use('/seller',sellerRoute)

const transactionRoute=require('./routes/transaction_route')
app.use('/transaction',transactionRoute)
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('API is running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




const userRoute=require('./routes/user_route')
app.use('/user',userRoute)

const farmerRoute=require('./routes/farmer_route')
app.use('/farmer',farmerRoute)

const productRoute=require('./routes/product_route')
app.use('/product',productRoute)
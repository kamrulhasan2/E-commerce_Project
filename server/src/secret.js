require('dotenv').config();


const PORT = process.env.PORT || 3008;
const connectDB = 'mongodb://localhost:27017/E-commerce_project';

module.exports = {PORT,connectDB}
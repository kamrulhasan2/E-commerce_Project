require('dotenv').config();
const fs = require('fs');


const PORT = process.env.PORT || 3008;
const connectDB = 'mongodb://localhost:27017/E-commerce_project';
const defaultImgPath = '/public/images/users/download.jpeg';

const jwtActivationKey = process.env.JWT_SECRET_ACTIVATION_KEY || "kjhsdjueioiuoewwo1233";





module.exports = {
    PORT,
    connectDB,
    defaultImgPath,
    jwtActivationKey
}
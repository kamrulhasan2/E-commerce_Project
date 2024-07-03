require('dotenv').config();
const fs = require('fs');


const PORT = process.env.PORT || 3008;
const connectDB = 'mongodb://localhost:27017/E-commerce_project';
const defaultImgPath = '/public/images/users/download.jpeg';

const jwtActivationKey = process.env.JWT_SECRET_ACTIVATION_KEY || "kjhsdjueioiuoewwo1233";

const smtpUserName = process.env.SMTP_USERNAME;
const smtpPassword = process.env.SMTP_PASSWORD;
const clientURL = process.env.CLIENT_URL;


module.exports = {
    PORT,
    connectDB,
    defaultImgPath,
    jwtActivationKey,
    smtpUserName,
    smtpPassword,
    clientURL
}
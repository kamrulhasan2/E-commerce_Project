require('dotenv').config();
const fs = require('fs');


const PORT = process.env.PORT || 3008;
const connectDB = 'mongodb://localhost:27017/E-commerce_project';
const defaultImgPath = '/public/images/users/download.jpeg';

const jwtActivationKey = process.env.JWT_SECRET_ACTIVATION_KEY || "kjhsdjueioiuoewwo1233";
const jwtAccessKey = process.env.JWT_ACCESS_KEY;

const smtpUserName = process.env.SMTP_USERNAME;
const smtpPassword = process.env.SMTP_PASSWORD;
const clientURL = process.env.CLIENT_URL;

const uploadUserImgPath = process.env.UPLOAD_USER_IMG_PATH || 'public/images/users';

const imgMaxFileSize = Number(process.env.IMG_MAX_FILE_SIZE) || 1024 * 1024 * 2;
const imgFileExtention = process.env.IMG_FILE_EXTENTION || ['jpg' , 'jpeg', 'png' ,'gif'];


module.exports = {
    PORT,
    connectDB,
    defaultImgPath,
    jwtActivationKey,
    smtpUserName,
    smtpPassword,
    clientURL,
    uploadUserImgPath,
    imgMaxFileSize,
    imgFileExtention,
    jwtAccessKey

}
require('dotenv').config();


const PORT = process.env.PORT || 3008;
const connectDB = 'mongodb://localhost:27017/E-commerce_project';
const defaultImgPath = 'public/images/users/download.jpeg';





module.exports = {
    PORT,
    connectDB,
    defaultImgPath
}
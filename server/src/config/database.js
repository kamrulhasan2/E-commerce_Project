const mongoose = require('mongoose');
const { connectDB } = require('../secret');

const connectDatabase = async (req,res)=>{
    try {
        await mongoose.connect(connectDB);
        console.log('Database is connected successfully');
        mongoose.connection.on('error',(error)=>{
            console.error('The error is: ',error);
        });

    } catch (error) {
        console.error(`Databe is not connected error is : ${error.toString()}`)
    }
};

module.exports = connectDatabase;

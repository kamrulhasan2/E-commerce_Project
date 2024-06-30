const createError = require('http-errors');
const user = require("../models/user.model");

const userController = (req,res,next)=>{
   try {
    res.send({
        message: 'user is returened successfully'
        // data:user[1]
    });
   } catch (error) {
    next(error);
   }
}

module.exports ={
    userController
}
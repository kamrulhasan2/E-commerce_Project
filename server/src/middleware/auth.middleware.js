const createHttpError = require("http-errors");
const jwt =require('jsonwebtoken');
const { jwtAccessKey } = require("../secret");

const isLoggedIn = async (req,res,next) =>{
    try {
        const accessToken = req.cookies.accessToken;
        
        if(!accessToken){
            throw createHttpError(404,'Access Token does not exist. Please login again.')
        }
        
        const decoded = jwt.verify(accessToken,jwtAccessKey);

        if(!decoded) {
            throw createHttpError(404,'Invalid Access Token. Please login again.')
        }

       
        console.log(decoded);

        next();

    } catch (error) {
        return next(error);
    }
}

const isLoggedOut = async (req,res,next) =>{
    try {
        const accessToken = req.cookies.accessToken;
        
       if(accessToken){
        try {
            const decoded = jwt.verify(accessToken,jwtAccessKey);
            if(decoded){
                throw createHttpError(400,'User is already Logged in');
            }
        } catch (error) {
            throw error;
        }
       }
        
        
        next();

    } catch (error) {
        return next(error);
    }
}


module.exports = {
    isLoggedIn,
    isLoggedOut
}
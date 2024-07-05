const { validationResult } = require('express-validator');
const { errorResponse } = require('../controller/response.controller');


const runValidation = async (req,res,next) =>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return errorResponse(req,res,{
                statusCode: 422,
                message: errors.array()[0].msg
            })
        }
        return next();
    } catch (error) {
        return next(error);
    }
};

module.exports = runValidation;
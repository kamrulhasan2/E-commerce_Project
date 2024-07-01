const errorResponse = (req,res ,
    {statusCode = 500 , message = "Internal server error"}) =>{
        return res.status(statusCode).json({
            success: false,
            message : message
        });
};


const successResponse = (req,res ,
    {statusCode = 200 , message = "Success", paylod ={} }) =>{
        return res.status(statusCode).json({
            success: true,
            message,
            paylod
        });
};






module.exports = {errorResponse , successResponse};
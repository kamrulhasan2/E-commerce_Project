// require npm pakages
const app = require('./src/app');
const createError = require('http-errors');
const { PORT } = require('./src/secret');






//error handling middleware

    //client side error
    app.use((req,res,next)=>{
        next(createError(404,'404 route not found'));
    });

    //server side error
    app.use((err,req,res,next)=>{
        return res.status(req.status || 500).json({
            success: false,
            message: `some thing went wrong: ${err.message}`
        });
    });


app.listen(PORT,()=>{
    console.log(`app is ready on : http://localhost:${PORT}`);
});
// require npm pakages
const express = require('express');
const morgan = require('morgan');
const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');
const userRouter = require('./routers/user.router');


//create app
const app = express();

//cratre a limiter using rate-limit function for api security
const limter = rateLimit({
    windowMs : 1 * 60 * 1000,
    limit: 10,
    message: 'too many request from this ip. please try again leter'
});

//application middeleware function use
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(xssClean());
app.use(limter);

//cerated middeleware
app.use(userRouter);

// root route
app.get('/',(req,res)=>{
    // throw new Error('BROKEN') ;
    res.send('hello ecommarce');
});



//export app
module.exports = app;
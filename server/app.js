// require npm pakages
const express = require('express');
const morgan = require('morgan');


//create app
const app = express();

//application middeleware function use
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//export app
module.exports = app;
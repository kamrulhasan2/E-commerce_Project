const { loginHandeler } = require('../controller/auth.controller');


const authRouter = require('express').Router();

authRouter.post('/login',loginHandeler);

module.exports = authRouter;
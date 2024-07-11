const { loginHandeler, logoutHandeler } = require('../controller/auth.controller');


const authRouter = require('express').Router();

authRouter.post('/login',loginHandeler);
authRouter.post('/logout',logoutHandeler);

module.exports = authRouter;
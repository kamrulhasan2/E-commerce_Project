const { loginHandeler, logoutHandeler } = require('../controller/auth.controller');
const { isLoggedOut, isLoggedIn } = require('../middleware/auth.middleware');


const authRouter = require('express').Router();

authRouter.post('/login',isLoggedOut,loginHandeler);
authRouter.post('/logout',isLoggedIn,logoutHandeler);

module.exports = authRouter;
const userRouter = require('express').Router();
const { userController } = require('../controller/user.controller');


userRouter.get('/api/user',userController);

module.exports = userRouter;
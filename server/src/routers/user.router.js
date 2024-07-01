const userRouter = require('express').Router();
const { userController, getUserById } = require('../controller/user.controller');


userRouter.get('/',userController);
userRouter.get('/:id',getUserById);

module.exports = userRouter;
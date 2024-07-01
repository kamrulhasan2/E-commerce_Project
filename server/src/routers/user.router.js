const userRouter = require('express').Router();
const { userController, getUserById, deleteUserController } = require('../controller/user.controller');


userRouter.get('/',userController);
userRouter.get('/:id',getUserById);
userRouter.delete('/:id',deleteUserController);

module.exports = userRouter;
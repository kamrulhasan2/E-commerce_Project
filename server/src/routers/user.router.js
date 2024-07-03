const userRouter = require('express').Router();
const { userController, getUserById, deleteUserController, processRegisterController } = require('../controller/user.controller');


userRouter.get('/',userController);
userRouter.get('/:id',getUserById);

userRouter.delete('/:id',deleteUserController);

userRouter.post('/process-register',processRegisterController);

module.exports = userRouter;
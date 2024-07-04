const userRouter = require('express').Router();
const { userController, getUserById, deleteUserController, processRegisterController, userVerifyController } = require('../controller/user.controller');
const upload = require('../middleware/uploadImage')

userRouter.get('/',userController);
userRouter.get('/:id',getUserById);

userRouter.delete('/:id',deleteUserController);

userRouter.post('/process-register',upload.single('image'),processRegisterController);
userRouter.post('/verify',userVerifyController);

module.exports = userRouter;
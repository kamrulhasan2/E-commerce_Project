const userRouter = require('express').Router();
const { userController, getUserById, deleteUserController, processRegisterController, userVerifyController, updateUserController } = require('../controller/user.controller');
const { isLoggedIn } = require('../middleware/auth.middleware');
const upload = require('../middleware/uploadImage');
const { validateUserRegProcess } = require('../validator/auth.validator');
const runValidation = require('../validator/run.auth');

userRouter.get('/',userController);
userRouter.get('/:id',isLoggedIn,getUserById);

userRouter.delete('/:id',isLoggedIn,deleteUserController);

userRouter.post('/process-register', upload.single('image'),validateUserRegProcess, runValidation,processRegisterController);
userRouter.post('/verify',userVerifyController);

userRouter.put('/update/:id', upload.single('image'),isLoggedIn,updateUserController);


module.exports = userRouter;
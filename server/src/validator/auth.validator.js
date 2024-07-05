const {body} = require('express-validator');

const validateUserRegProcess = [
    body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({min :3, max: 25})
    .withMessage('Name should be 3 to 25 charecter long'),
    body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required'),
    body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone is required')
    .isLength({min:11,max:11})
    .withMessage('Phone number must be 11 Charecter long'),
    body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/
    )
    .withMessage('Password should be Minimum 6 characters, Maximum 20 characters,At least one uppercase character,At least one lowercase character,At least one digit ,At least one special character')
    
];

module.exports = {
    validateUserRegProcess,
}
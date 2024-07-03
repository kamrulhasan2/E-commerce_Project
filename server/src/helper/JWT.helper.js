const jwt = require('jsonwebtoken');
const jwtActivationKey = require('../secret');

const createJWT = (paylod,jwtActivationKey,expiresIn) =>{
    if(typeof paylod !== 'object' || !paylod){
        throw new Error('Payload must be a non-empty object');
    }
    if(typeof jwtActivationKey !== 'string' || jwtActivationKey == ''){
        throw new Error('Secret key must be a non-empty string');
    }

    try {
        const token = jwt.sign(paylod, jwtActivationKey,{expiresIn});
        return token;
    } catch (error) {
        console.error('Field to sign the jwt: ' ,error);
    }
};

module.exports = {createJWT};


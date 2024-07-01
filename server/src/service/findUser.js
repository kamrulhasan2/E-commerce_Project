const createError = require('http-errors');
const users = require('../models/user.model');

const findUser = async (id)=>{
    try {
        const options = {password: 0};
        const user = await users.findById(id,options);

        if (!user){
            throw createError(404, 'User does not exist');
        }
        
        return user;

    } catch (error) {
        if(error instanceof mongoose.Error){
            throw createError(400, 'Invalid user');
            return;
        }
        throw error;       
    }
}


module.exports = {findUser}
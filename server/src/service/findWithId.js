const createError = require('http-errors');
const users = require('../models/user.model');

const findWithId = async (Model,id,options = {})=>{
    try {
        const item = await users.findById(id,options);

        if (!item){
            throw createError(404, `${Model.modelName} does not exist`);
        }

        return item;

    } catch (error) {
        if(error instanceof mongoose.Error){
            throw createError(400, `Invalid ${Model.modelName}`);
            return;
        }
        throw error;       
    }
}


module.exports = {findWithId}
const createError = require('http-errors');
const users = require("../models/user.model");

const userController = async (req,res,next)=>{
   try {

    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 1;

    const searchRegExp = new RegExp('.*' + search +'.*', 'i');

    const filter = {
        isAdmin: {$ne : true},
        $or:[
            {name:{$regex: searchRegExp}},
            {email: {$regex: searchRegExp}},
            {phone: {$regex: searchRegExp}},
        ]
    }
    const option = {password : 0};
    const user = await users.find(filter,option)
        .limit(limit)
        .skip((page - 1) * limit);

    const count = await users.find(filter).countDocuments();

    if(!user) throw createError(404,'user not found')

    res.send({
        message: 'user is returened successfully',
        data:user,
        pagination: {
            totalpages: Math.ceil(count/limit),
            currentPage: page,
            previousPage: page - 1 > 0 ? page - 1 : null,
            nextPage: page + 1 <= Math.ceil(count/limit) ? page + 1 : null
        }
    });
   } catch (error) {
    next(error);
   }
}

module.exports ={
    userController
}
const createError = require('http-errors');
const users = require("../models/user.model");
const { successResponse } = require('./response.controller');
const  mongoose = require('mongoose');
const { findWithId } = require('../service/findWithId');
const fs = require('fs');



const userController = async (req,res,next)=>{
   try {

    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 2;

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

        return successResponse(req,res, {
            statusCode : 200,
            message : "user is returned successfully",
            paylod : {
                data: user,
                pagination: {
                    totalpages: Math.ceil(count/limit),
                    currentPage: page,
                    previousPage: page - 1 > 0 ? page - 1 : null,
                    nextPage: page + 1 <= Math.ceil(count/limit) ? page + 1 : null
                }
        }

    });
   } catch (error) {
    next(error);
   }
}


const getUserById = async (req,res,next) =>{
    try {

        const id = req.params.id;
        const user = await findWithId(id,options = { password:0 })
        return successResponse(req,res, {
            statusCode : 200,
            message : "user is returned successfully",
            paylod : { user }
        });
    } catch (error) {
        next(error);
    }
}


const deleteUserController = async (req,res,next) =>{
   
    try {
        
        const id = req.params.id;
        const user = await findWithId(id,options);
        
        userImagePath = user.image;
        fs.access(userImagePath, (err)=>{
            if(err){
                console.error("user image dose not exist");
            }else{
                fs.unlink(userImagePath,(err)=>{
                    if(err) throw err;
                    console.log("user image is deleted");
                });
            }
        } );

      
        await users.findByIdAndDelete({
            _id: id,
            isAdmin: false
        });

        return successResponse(req,res,{
            statusCode:200,
            message:"user is deleted successfully",
        });
    } catch (error) {
        next(error);
    }
}



module.exports ={
    userController,
    getUserById,
    deleteUserController
}
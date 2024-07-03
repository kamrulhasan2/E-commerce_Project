const createError = require('http-errors');
const users = require("../models/user.model");
const { successResponse } = require('./response.controller');
const  mongoose = require('mongoose');
const { findWithId } = require('../service/findWithId');
const fs = require('fs');
const { deleteImage } = require('../helper/deleteImg.helper');
const { createJWT } = require('../helper/JWT.helper');
const { jwtActivationKey } = require('../secret');




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
        const user = await findWithId(users,id,options = { password:0 })
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
        const user = await findWithId(users,id,options);
        
        userImagePath = user.image;
        deleteImage(userImagePath);

      
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
};


const processRegisterController = async (req,res,next) =>{
    try {
        
        const {name,email,phone,password} = req.body;

        const existUser = await users.exists({email : email});

        if(existUser){
            throw createError(409,'User already exists with this email. Try too login');
        };

        const token = createJWT({name,email,phone,password}, jwtActivationKey, '10m')


        return successResponse(req,res,{
            statusCode:200,
            message:"user is register successfully",
            paylod:{
                token
            }
        });
    } catch (error) {
        next(error);
    }
};


module.exports ={
    userController,
    getUserById,
    deleteUserController,
    processRegisterController
}
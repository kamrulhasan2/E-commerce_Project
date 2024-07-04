const createError = require('http-errors');
const users = require("../models/user.model");
const { successResponse } = require('./response.controller');
const  mongoose = require('mongoose');
const { findWithId } = require('../service/findWithId');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const { deleteImage } = require('../helper/deleteImg.helper');
const { createJWT } = require('../helper/JWT.helper');
const { jwtActivationKey, clientURL } = require('../secret');
const sendEmailWithNM = require('../helper/email.helper');
const { decode } = require('punycode');




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

        //prepare email 
        const emailData = {
            email,
            subject:`Account Activation Email`,
            html:`
                <h2> Hello ${name} !</h2>
                <p> Please Click here to <a href="${clientURL}/api/users/activate/${token}" target ="_blank">
                activate your account </a> </p>            
            `
        }

        //send email with nodemailer
       try {
        await sendEmailWithNM(emailData);
       } catch (error) {
        throw createError(500,"some thing went wrong when email verification");
        return;
       }

        return successResponse(req,res,{
            statusCode:200,
            message:`Please cheak your email address : ${email}`,
            paylod:{
                token
            }
        });
    } catch (error) {
        next(error);
    }
};

const userVerifyController = async (req,res,next) =>{
    try {
        const token = req.body.token;
        if(!token){
            throw createError(404,'token not found');
        }

        try {
            const decoded = jwt.verify(token,jwtActivationKey);
            if(!decoded) throw createError(401,'user is not able to verified');

            const user = await users.create(decoded);

            return successResponse(req,res,{
                statusCode:200,
                message:`Register user successfully`,
                paylod:{
                    user
                }
            });
        } catch (error) {
            if(error.name === 'TokenExpiredError'){
                throw createError(401,'Token has Expired');
            }else if(error.name === 'jsonWebTokenError'){
                throw createError(401,'Invalid token');
            }else{
                throw error;
            }
        }

        
    } catch (error) {
        next(error);
    }
}

module.exports ={
    userController,
    getUserById,
    deleteUserController,
    processRegisterController,
    userVerifyController
}
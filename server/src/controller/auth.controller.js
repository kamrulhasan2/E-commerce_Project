const createError = require('http-errors');
const users = require("../models/user.model");
const { successResponse } = require('./response.controller');
const jwt = require('jsonwebtoken');
const { createJWT } = require('../helper/JWT.helper');
const bcrypt  = require('bcryptjs');
const { jwtAccessKey } = require('../secret');

const loginHandeler = async (req,res,next) =>{
    try {
        const {email,password} = req.body;
        const user = await users.findOne({email});

        if(!user){
            throw createError(404,'User does not exist. Please register first');
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password);

        if(!isPasswordMatch){
            throw createError(401,'Incorrect password. Please try again');
        }

        const isBanned = user.isBanned;

        if(isBanned){
            throw createError(403,'You are banned for this site');
        }

        const token = createJWT({email}, jwtAccessKey, '10m');

        res.cookie('access-token',token,{
            maxAge: 10 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });

        return successResponse(req,res,{
            statusCode:200,
            message:"user is login successfully",
            paylod: {
               user
            }
        });
    } catch (error) {
        next(error);
    }

}

const logoutHandeler = async (req,res,next) =>{
    try {
        
        res.clearCookie('access-token');

        return successResponse(req,res,{
            statusCode:200,
            message:"user is logged out successfully",
            paylod: {
               
            }
        });
    } catch (error) {
        next(error);
    }

}

module.exports = {
    loginHandeler,
    logoutHandeler
};
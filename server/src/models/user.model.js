const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { defaultImgPath } = require('../secret');

const userSchema = new mongoose.Schema({
    id:{
        type:String,
        unique: true
    },
    name:{
        type: String,
        require: true,
        trim: true,
        minlength : [3,'minimum lengeth is 3'],
        maxlength: [25,'maximum length is 25']
    },
    email:{
        type:String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: (v)=>{
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "please enter a valid email"
        }

    },
    phone:{
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true,
        set: (v)=> bcrypt.hashSync(v, bcrypt.genSaltSync(10)),


    },
    image: {
        type: String,
        // default:defaultImgPath
    },
    address: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBanned: {
        type: Boolean,
        default: false
    }

},{timestamps:true});


module.exports = new mongoose.model('users',userSchema);
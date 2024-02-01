const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    businessName:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    privateKey:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    }
})



module.exports = mongoose.model("User",UserSchema)


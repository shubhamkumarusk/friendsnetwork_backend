const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    email:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    bio:{
        type:String,
        require:false
    },
    profilePic:{
        type:String,
        default:null,
        require:false
    },
    profileSetup:{
        type:Boolean,
        default:false
    }
    });

exports.users = mongoose.model("users",UserSchema);
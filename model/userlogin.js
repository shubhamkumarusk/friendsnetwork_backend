const mongoose = require('mongoose');
const { Schema } = mongoose;

const loginSchema = new Schema({
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})

exports.userLogin = mongoose.model("userLogin",loginSchema);
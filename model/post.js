const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    text: {
        type: String,
        required: true
    }
})
const postSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"users",
        require:true
    },
    image:{
        type:String,
        require:true,
        default:null
    },
    caption:{
        type:String,
        require:false,
        default:null
    },
    likes:[{type:String}],
    comments:[commentSchema]
})

exports.PostPic = mongoose.model("posts",postSchema)
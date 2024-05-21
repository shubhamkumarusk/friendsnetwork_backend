const model = require("../model/post")
const userModel = require("../model/users")
const users = userModel.users
const posts = model.PostPic

exports.postApic = async(req,res)=>{
    const query = {
        email:req.body.email
    }
    const user = await users.findOne(query)
    const userId = user._id
    const newPost = new posts({
        user:userId,
        image:req.body.image,
        caption:req.body.caption,
        likes:req.body.likes,
        comments:req.body.comments
    })
    await newPost.save()
    res.status(200).send()
}

exports.LikePics = async(req,res)=>{
    try{
        const {id} = req.params
        const post = await posts.findById(id)
        if(!post.likes.includes(req.body.email)){
            await post.updateOne({$push:{likes:req.body.email}})
            res.status(200).json("liked post")
        }
        else{
            await post.updateOne({$pull:{likes:req.body.email}})
            res.status(201).json("disliked post")
        }
    } catch{
        res.status(500).send()
    }
    
}

exports.addCommentToPost = async (req, res, error) => {
    try {
        const { id } = req.params;
        const post = await posts.findById(id);

        const query = {
            email: req.body.email
        };
        const user = await users.findOne(query);
        const userId = user._id;

        const newComment = {
            user: userId,
            text: req.body.text
        };

        post.comments.push(newComment);
        await post.save();

        // Populate the last added comment
        const populatedPost = await post.populate({
            path: 'comments.user',
            model: 'users',
            match: { _id: userId }
        })
        console.log(populatedPost);
        const populateComment = populatedPost.comments[populatedPost.comments.length - 1];
        
        res.status(200).send(populateComment);
    } catch (err) {
        res.status(500).send(err.message);
    }
};


exports.getAllPost = async(req,res,error)=>{
    try{
        const AllPosts = await posts.find().populate({path:"user",model:"users"}).
                                            populate({path:"comments.user",model:"users"})

        res.status(200).send(AllPosts)

    } catch{
        res.status(500).send({error});
    }
}

exports.getAUserPost = async(req,res,error)=>{
    try{
        const {email} = req.params
        const query = {
            email:email
        }
        const _user = await users.findOne(query)
        const userPost = await posts.find({user:_user._id}).populate({path:"user",model:"users"}).
                                                            populate({path:"comments.user",model:"users"})
        res.status(200).send(userPost)
    }
    catch{
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }

}


const model = require('../model/userlogin')
const users = model.userLogin

exports.register = async (req,res)=>{
    const query = {
        email:req.body.email
    };
    const result = await users.findOne(query);
    if(result==null){
        const newUser = new users(req.body)
        newUser.save()
        res.status(200).json(req.body)
    }
    else{
        res.status(400).send()
    }   
}

exports.showUsers = async (req,res)=>{
    const Users = await users.find()
    res.json(Users)
}

exports.signin = async (req,res)=>{
    const query = {
        email:req.body.email
    }
    const result = await users.findOne(query)
    if(result!=null){
        if(req.body.password==result.password){
            res.status(200).send()
        }
        else{
            res.status(400).send()
        }
    }
    else{
        res.status(404).send()
    }
}


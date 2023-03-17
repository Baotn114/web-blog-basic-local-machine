// Set up a confidential environment
require("dotenv").config()

// Set up a userModel from your model
const userModel = require("../models/userModel");
const Comment = require("../models/comment");
// Set up a jwt
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'});
}

// Login user
const loginUser = async(req, res)=>{
    const {email, password} = req.body;
    try {
        const user = await userModel.login(email, password);
        
        // create a token
        const token = createToken(user._id);
        res.status(200).json({email, token});
    }catch(error){
        res.status(400).json({error: error.message});
    }
}


//Signup user
const signupUser = async(req, res)=>{
    const {email, password} = req.body;

    try {
        const user = await userModel.signup(email, password);
        
        // create a token
        const token = createToken(user._id);
        res.status(200).json({email, token});
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

//User comment
const comments = async(req, res) =>{
    const blogId = req.params['id'];
    //const blogId = numberId + "_" + `${new Date().getTime()}`;
    //console.log(blogId)
    const {userName, comment} = req.body;
    //console.log(comment);
    try{
        const response = await Comment.create({blogId, userName, comment});
        res.status(200).json(response);
    }catch(error){
       res.status(400).json({error: error.message});
    }
}

//Get all comments
const getComments = async(req, res) => {
    const numberId = req.params['id'];
    try{
        const post = await Comment.find({blogId: numberId}).sort({createdAt: -1});
        //console.log(post);
        res.status(200).json(post);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {loginUser, signupUser, comments, getComments}
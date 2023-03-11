// Set up a confidential environment
require("dotenv").config()

// Set up a userModel from your model
const userModel = require("../models/userModel");
const Blogs = require("../models/model");

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
    const numberId = req.params['id'];
    const {userName, comment} = req.body;
    try{
        const post = await Blogs.findById(numberId);
        post.user_data.push({userName: userName, Comments: comment});
        //post.user_data.user_name.push(userName);
        await Blogs.findByIdAndUpdate(numberId, post, {new: true});
        //console.log(test);

    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//Get all comments
const getComments = async(req, res) => {
    const numberId = req.params['id'];
    try{
        const post = await Blogs.findById(numberId);
        return res.status(200).json(post.user_data);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {loginUser, signupUser, comments, getComments}
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
    const {comment} = req.body;
    // const numberId = req.params['id'];
    // console.log(numberId);
    try{
        const post = await Blogs.findById(numberId);
        //console.log(post.Comments)
        post.Comments.push(comment);
        await Blogs.findByIdAndUpdate(numberId, post, {new: true});
        // res.status(200).json(updatedPost);
        // res.status(200).send("You commented");
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//Get all comments
const getComments = async(req, res) => {
    const numberId = req.params['id'];
    try{
        const post = await Blogs.findById(numberId);
        console.log(post.Comments);
        return res.status(200).json(post.Comments);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {loginUser, signupUser, comments, getComments}
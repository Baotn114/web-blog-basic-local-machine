const Blogs = require("../models/model");

// Get homepage
const getBlogs = async (req, res) => {
    const blogs = await Blogs.find({}).sort({createdAt: -1});
    res.status(200).json(blogs);
}

const getDetails = async (req, res) => {
    const numberId = req.params['id'];
    // console.log(numberId);
    const blogs = await Blogs.findById({_id: numberId}).sort({createdAt: -1});
    // const blogs = await Blogs.find({}).sort({createdAt: -1});
    res.status(200).json(blogs);
}

// Create blogs
const createBlogs = async (req, res) => {
    const {title, author, content} = req.body;

    try{
        const blogs = await Blogs.create({title, author, content});
        res.status(200).json(blogs);
    } catch(error){
        res.status(400).json({error: error.message})
    }
}


// Export all the routes
module.exports ={
    getBlogs,
    getDetails,
    createBlogs
}
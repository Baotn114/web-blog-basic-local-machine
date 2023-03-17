const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: String,
    author: String,
    content: String,
    image: String,
}, {timestamps: true})



module.exports = mongoose.model("Blogs", blogSchema);
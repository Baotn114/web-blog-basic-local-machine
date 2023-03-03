const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: String,
    author: String,
    content: String,
    Comments: {
        type: [String], 
        default: []
    }
}, {timestamps: true})



module.exports = mongoose.model("Blogs", blogSchema);
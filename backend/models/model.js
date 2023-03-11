const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: String,
    author: String,
    content: String,
    user_data: [
        {
            userName : String,
            Comments : String
        }
    ]
}, {timestamps: true})



module.exports = mongoose.model("Blogs", blogSchema);
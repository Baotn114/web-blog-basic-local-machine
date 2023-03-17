const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    blogId: String,
    userName: String,
    comment: String
}, {timestamps: true})

module.exports = mongoose.model("comment", commentSchema);


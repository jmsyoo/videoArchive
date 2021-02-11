const {Schema, model} = require('mongoose');

const commentSchema = new Schema({
    name: String,
    message: String
},{
    timestamps:true
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;
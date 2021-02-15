const {Schema, model} = require('mongoose');

const commentSchema = new Schema({
    name: String,
    message: String,
    rating: {type:Number, default:0, max:5}
},{
    timestamps:true
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;
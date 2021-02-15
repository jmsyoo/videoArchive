const Comment = require('../models/comment');
const MyVideo = require('../models/myVideo');
const express = require('express');
const commentRounter = express.Router();

commentRounter.post('/', async (req, res) => {
    console.log(req.body)
    try{
        const {name, message, rating, videoId} = req.body
        const newComment = await Comment.create({
            name,
            message,
            rating
        });
        const foundVideo = await MyVideo.findById(videoId)
        // console.log(foundVideo);

        const videoComments = foundVideo.comments;
        const updatedVideo = await MyVideo.findByIdAndUpdate(videoId, {comments: [...videoComments, newComment._id]});
    }catch(error) {
        res
            .status(400)
            .json(error)
    }
})
// Read
commentRounter.get('/', async (req,res) => {
    try{
        const foundComments = await Comment.find({});
        res
            .status(200)
            .json(foundComments)
    }catch(error) {
        res
            .status(400)
            .json(error)
    }
})

// Destroy
commentRounter.delete('/:id', async (req, res) => {
    try{
        const foundComment = await Comment.findByIdAndDelete(req.params.id);
        res
            .status(200)
            .json(foundComment)
    }catch(error) {
        res
            .status(400)
            .json(error)
    }
})

// Update
commentRounter.put('/:id', async (req, res) => {
    try{
        const foundComment = await Comment.findByIdAndUpdate(req.params.id, req.body, {new:true} )
        res
            .status(200)
            .json(foundComment)

    }catch(error) {
        res
            .status(400)
            .json(error)
    }
})

module.exports = commentRounter;
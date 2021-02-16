const MyVideo = require('../models/myVideo');
const express = require('express');
const myVideoRouter = express.Router();

// CRUD
// Create
myVideoRouter.post('/', async (req, res) => {
    try{
        const newVideoPost = await MyVideo.create(req.body);
        res
            .status(200)
            .json(newVideoPost);
    }catch(error){
        res
            .status(400)
            .json(error)
    }
})

// Read
/* Index */
myVideoRouter.get('/', async (req, res) => {
    try{
        const foundVideos = await MyVideo.find({});
        res
            .status(200)
            .json(foundVideos)
    }catch(error) {
        res
            .status(400)
            .json(error)
    }
})

/* Show */
myVideoRouter.get('/:id', async (req, res) => {
    try {
        const foundVideo = await MyVideo.findById(req.params.id);
        await foundVideo.execPopulate('comments')
        res
            .status(200)
            .json(foundVideo)
    }catch(error) {
        res
            .status(400)
            .json(error)
    }
})

/* Delete */
myVideoRouter.delete('/:id', async (req, res) => {
    try{
        const foundVideo = await MyVideo.findByIdAndDelete(req.params.id);
        res
            .status(200)
            .json(foundVideo)
    }catch(error) {
        res
            .status(400)
            .json(error)
    }
})

/* Update */
myVideoRouter.put('/:id', async (req, res) => {
    try{
        const foundVideo = await MyVideo.findByIdAndUpdate(req.params.id, req.body, {new: true})
        await foundVideo.execPopulate('comments')
        console.log(foundVideo)

        res
            .status(200)
            .json(foundVideo);
    } catch(error) {
        res
            .status(400)
            .json(error)
    }
})


module.exports = myVideoRouter;
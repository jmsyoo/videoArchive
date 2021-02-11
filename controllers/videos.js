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



module.exports = myVideoRouter;
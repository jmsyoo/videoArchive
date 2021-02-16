const Contact = require('../models/contact');
const express = require('express');
const myContactRouter = express.Router();

myContactRouter.post('/', (req, res)=> {
    Contact.create(req.body, (err, createContact) => {
        if(!err){
            res
                .status(200)
                .json(createContact)
        }else{
            res
                .status(400)
                .json(err)
        }
    })
})

module.exports = myContactRouter;
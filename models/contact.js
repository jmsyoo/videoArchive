const {Schema, model} = require('mongoose');

const contactSchema = new Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    message:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const Contact = model('Contact', contactSchema);

module.exports = Contact;
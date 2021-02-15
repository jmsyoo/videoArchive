const {Schema, model} = require('mongoose');

const videoSchema = new Schema({
    id: {type:String, unique:true, required:true},
    title: String,
    channelTitle: String,
    description: String,
    category:String,
    comments: [{type:Schema.Types.ObjectId, ref:'Comment'}]
},{
    timestamps: true
})

const MyVideo = model('Video', videoSchema);

module.exports = MyVideo;
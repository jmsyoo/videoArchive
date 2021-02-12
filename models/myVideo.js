const {Schema, model} = require('mongoose');

const videoSchema = new Schema({
    id: {type:String, unique:true, required:true},
    title: String,
    channelTitle: String,
    description: String,
    rating: {type:Number, default:0, max:5},
    comment: [{type:Schema.Types.ObjectId, ref:'Comment'}]
},{
    timestamps: true
})

const MyVideo = model('Video', videoSchema);

module.exports = MyVideo;
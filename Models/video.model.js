import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    videoLink:{
        type:String,
        required:true,
        default:""
    },
    thumbnail:{
        type:String,
        required:true,
        default:""
    },
    videoType:{
        type:String,
        default:""
    },
    like:{
        type:Number,
        default:0
    },
    dislike:{
        type:Number,
        default:0
    }
},{timestamps:true})



const Video = mongoose.model('video', videoSchema);
export default Video;
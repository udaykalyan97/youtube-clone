import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
        required: true
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'video', 
        required: true
    },
    message: { 
        type: String, 
        required: true
    },
    deleted: { 
        type: Boolean, 
        default: false 
    }
},{timestamps:true})


const Comment = mongoose.model('comment', commentSchema);
export default Comment;
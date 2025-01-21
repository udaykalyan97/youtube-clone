import Comment from '../Models/comment.model.js';

export const addComment = async(req,res)=>{
    try{
        let {video, message} = req.body;
        const comment = new Comment({user:req.user._id, video, message});
        await comment. save();

        res.status(201).json({
            message: "Success",
            comment
        })

    } catch (error){
        res.status(500).json({ error: 'Server error' });
    }
}


export const getCommentByVideoId = async(req,res)=>{
    try{
        let {videoId} = req.params;
        const comments = await Comment.find({video:videoId});

        res.status(201).json({
            message: "Success",
            comments
        });

    } catch (error){
        res.status(500).json({ error: 'Server error' });
    }
}

export const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { message } = req.body;

        // Check if the message is provided
        if (!message) {
            return res.status(400).json({ error: 'Message is required.' });
        }

        // Find the comment and update it
        const updatedComment = await Comment.findOneAndUpdate(
            { _id: commentId, user: req.user._id }, // Ensure the user owns the comment
            { message },
            { new: true } // Return the updated comment
        );

        if (!updatedComment) {
            return res.status(404).json({ error: 'Comment not found or unauthorized.' });
        }

        res.status(200).json({
            message: 'Comment updated successfully.',
            comment: updatedComment,
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error.' });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        // Find and delete the comment
        const deletedComment = await Comment.findOneAndDelete({
            _id: commentId,
            user: req.user._id, // Ensure the user owns the comment
        });

        if (!deletedComment) {
            return res.status(404).json({ error: 'Comment not found or unauthorized.' });
        }

        res.status(200).json({
            message: 'Comment deleted successfully.',
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error.' });
    }
};
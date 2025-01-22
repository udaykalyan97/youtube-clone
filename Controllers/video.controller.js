import Video from '../Models/video.model.js';


export const uploadVideo = async (req,res)=>{
    try{
        const { title, description, videoLink, videoType,thumbnail }  = req.body;
        const videoUpload = new Video({user: req.user._id, title, description, videoLink, videoType, thumbnail});
        await videoUpload.save();
         
        res.status(201).json({ sucess: "true", videoUpload });


    }catch (error){
        res.status(500).json({ error: 'Server error' });
    }
}


export const getAllVideo = async(req,res)=>{
    try{
        const videos = await Video.find().populate('user','channelName profilePic userName createdAt');
         
        res.status(201).json({ sucess: "true", "videos": videos });
    }catch (error){
        res.status(500).json({ error: 'Server error' });
    }
}

export const getVideoById = async (req,res)=>{
    try{
        let {id} = req.params;
        const video = await Video.findById(id).populate('user','channelName profilePic userName createdAt');
        res.status(201).json({ sucess: "true", "video": video });
    }catch (error){
        res.status(500).json({ error: 'Server error' });
    }
}

export const getAllVideoByUserID = async(req,res)=>{
    try{
        let {userId} = req.params;
        const video = await Video.find({user:userId}).populate('user','channelName profilePic userName createdAt about');
        res.status(201).json({ sucess: "true", "video": video });

    }catch (error){
        res.status(500).json({ error: 'Server error' });
    }
}

export const searchVideos = async (req, res) => {
    try {
        const { query } = req.query; // Get the search query from the request query parameters

        if (!query || query.trim() === "") {
            return res.status(400).json({ error: 'Search query cannot be empty' });
        }

        // Search for videos where the title or description matches the query
        const videos = await Video.find({
            $or: [
                { title: { $regex: query, $options: "i" } }, // Case-insensitive match for title
                { description: { $regex: query, $options: "i" } } // Case-insensitive match for description
            ]
        }).populate('user', 'channelName profilePic userName createdAt');

        if (videos.length === 0) {
            return res.status(404).json({ success: "true", message: "No videos found matching the query" });
        }

        res.status(200).json({ success: "true", videos });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


export const updateVideo = async (req, res) => {
    try {
        const { id } = req.params; // Video ID from the request parameters
        const { title, description, videoLink, videoType, thumbnail } = req.body; // Updated details from the request body

        // Find the video by ID and ensure it belongs to the authenticated user
        const video = await Video.findOne({ _id: id, user: req.user._id });
        if (!video) {
            return res.status(404).json({ success: false, message: "Video not found or you are not authorized to update it." });
        }

        // Update the video with new data
        video.title = title || video.title;
        video.description = description || video.description;
        video.videoLink = videoLink || video.videoLink;
        video.videoType = videoType || video.videoType;
        video.thumbnail = thumbnail || video.thumbnail;

        // Save the updated video
        await video.save();

        res.status(200).json({ success: true, message: "Video updated successfully", video });
    } catch (error) {
        console.error("Error updating video:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


export const deleteVideo = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the video by ID
        const video = await Video.findById(id);

        // Check if video exists
        if (!video) {
            return res.status(404).json({ success: "false", message: "Video not found" });
        }

        // Check if the authenticated user owns the video
        if (video.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: "false", message: "You do not have permission to delete this video" });
        }

        // Delete the video
        await video.deleteOne();

        res.status(200).json({ success: "true", message: "Video deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
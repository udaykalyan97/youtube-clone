import express from 'express';
import { 
    uploadVideo, 
    getAllVideo, 
    getVideoById, 
    getAllVideoByUserID, 
    searchVideos, 
    deleteVideo, 
    updateVideo 
} from '../Controllers/video.controller.js';
import auth from '../middleware/authentication.js';

const videoRouter = express.Router();

videoRouter.post('/video', auth, uploadVideo);
videoRouter.get('/allVideo', getAllVideo);
videoRouter.get('/getVideoById/:id', getVideoById);
videoRouter.get('/:userId/channel', getAllVideoByUserID);
videoRouter.get('/videos/search', searchVideos);
videoRouter.put('/video/:id', auth, updateVideo); 
videoRouter.delete('/video/:id', auth, deleteVideo);


export default videoRouter;

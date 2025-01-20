import express from 'express';
import auth from '../middleware/authentication.js';
import { addComment, getCommentByVideoId } from '../Controllers/comment.controller.js';

const commentRouter = express.Router();

commentRouter.post('/comment',auth, addComment);
commentRouter.get('/comment/:videoId', getCommentByVideoId);

export default commentRouter;
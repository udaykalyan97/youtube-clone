import express from 'express';
import auth from '../middleware/authentication.js';
import { addComment, getCommentByVideoId, updateComment, deleteComment } from '../Controllers/comment.controller.js';

const commentRouter = express.Router();

commentRouter.post('/comment',auth, addComment);
commentRouter.get('/comment/:videoId', getCommentByVideoId);
commentRouter.put('/comment/:commentId', auth, updateComment);
commentRouter.delete('/comment/:commentId', auth, deleteComment);


export default commentRouter;
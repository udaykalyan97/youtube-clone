import express from "express";
import userRouter from "./Routes/user.routes.js";
import videoRouter from "./Routes/video.routes.js";
import commentRouter from "./Routes/comment.routes.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import { mongooseConnection } from "./Connection/conn.js";

const app = express();
const port = 4000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

// Middleware to parse incoming JSON requests
app.use(express.json());

app.use(cookieParser());

app.use('/auth', userRouter);
app.use('/api', videoRouter);
app.use('/commentApi', commentRouter);

app.listen(port, () => {
    console.log(`Our backend project is running on Port ${port}`);
});

import dotenv from "dotenv";
dotenv.config();

import path from 'path';
import cors from 'cors';
import express from 'express';
import userRouter from './routes/user/users.route.js';
import chatRoomRouter from './routes/chatRoom/chatRoom.route.js';
import chatMessageRouter from './routes/chatMessage/chatMessage.router.js';

const api = express();

api.use(cors({
    origin: process.env.ORIGIN_URL,
    methods: ['*']
}));

api.use(express.json());

api.use('/api/user', userRouter);
api.use('/api/room', chatRoomRouter);
api.use('/api/message', chatMessageRouter);

if (process.env.NODE_ENV === "production") {
    const __dirname = import.meta.dirname;
    api.use(express.static(path.join(__dirname, '..', 'public')));
    api.get("/*", (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'index.html'), (err) => {
            res.status(404).json(err);
        });
    });
}

export default api;
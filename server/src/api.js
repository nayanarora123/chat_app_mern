import path from 'path';
import cors from 'cors';
import express from 'express';
import userRouter from './routes/user/users.route.js';
import chatRoomRouter from './routes/chatRoom/chatRoom.route.js';
import chatMessageRouter from './routes/chatMessage/chatMessage.router.js';

const __dirname = import.meta.dirname;
const api = express();

api.use(cors({
    origin: 'http://localhost:3000',
    methods: ['*']
}));

api.use(express.json());

// app.use(express.static(path.join(__dirname, '..', 'public')));

api.use('/api/user', userRouter);
api.use('/api/room', chatRoomRouter);
api.use('/api/message', chatMessageRouter);

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
// });

export default api;
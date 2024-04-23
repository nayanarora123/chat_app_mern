import http from 'http';
import cors from 'cors';
import path from 'path';
import dotenv from "dotenv";
import express from 'express';
import { Server } from 'socket.io';
import { connectMongo } from './config/mongo.js';
import userRouter from './routes/user/users.route.js';
import chatRoomRouter from './routes/chatRoom/chatRoom.route.js';
import { log } from 'console';


dotenv.config();

const __dirname = import.meta.dirname;

const app = express();

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
        method: ['GET', 'POST']
    }
});

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
}));

app.use(express.json());

const onlineUsers = new Map();

// app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/user', userRouter);
app.use('/api/room', chatRoomRouter);

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });



io.on('connection', (socket) => {
    
    socket.on('addUser', (userId) => {
        onlineUsers.set(userId, socket.id);
        socket.emit('getUsers', Array.from(onlineUsers))
    })

});

const PORT = process.env.PORT || 3001

async function startHttpServer(){
    await connectMongo();
    httpServer.listen(PORT, () => {
        console.log(`Server started on ${PORT}`);
    });
}

startHttpServer();
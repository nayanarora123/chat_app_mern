import http from 'http';
import cors from 'cors';
import path from 'path';
import dotenv from "dotenv";
import express from 'express';
import { Server } from 'socket.io';
import { connectMongo } from './config/mongo.js';
import userRouter from './routes/user/users.route.js';
import chatRoomRouter from './routes/chatRoom/chatRoom.route.js';
import chatMessageRouter from './routes/chatMessage/chatMessage.router.js';


dotenv.config();

const __dirname = import.meta.dirname;

const app = express();

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
        method: ['GET', 'POST']
    }
});

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
}));

app.use(express.json());

// app.use(express.static(path.join(__dirname, '..', 'public')));

const onlineUsers = new Map();

app.use('/api/user', userRouter);
app.use('/api/room', chatRoomRouter);
app.use('/api/message', chatMessageRouter);

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
// });


function getKey(onlineUsers, socketId) {
    for (const [key, val] of onlineUsers.entries()) {
        if (val === socketId) return key;
    }
}

io.on('connection', (socket) => {

    socket.on('addUser', (userId) => {
        onlineUsers.set(userId, socket.id);
        io.emit('getUsers', Array.from(onlineUsers))
    });

    socket.on("sendMessage", ({ senderId, receiverId, message }) => {
        const sendUserSocket = onlineUsers.get(receiverId);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("getMessage", {
                senderId,
                message,
            });
        }
    });

    socket.on('disconnect', (reason) => {
        onlineUsers.delete(getKey(onlineUsers, socket.id));
        console.log(`Client ${socket.id} disconnected: ${reason}`);
        socket.broadcast.emit('getUsers', Array.from(onlineUsers));
    });

});

const PORT = process.env.PORT || 3001

async function startServer() {
    await connectMongo();
    httpServer.listen(PORT, () => {
        console.log(`Server started on ${PORT}`);
    });
}

startServer();
import http from 'http';
import express from 'express';
import dotenv from "dotenv";
import path from 'path';
import userRouter from './routes/user/users.route.js';
import { Server } from 'socket.io';
import cors from 'cors';

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

// app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/user', userRouter);

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

io.on('connection', (socket) => {

    console.log(`User Connected ${socket.id}`);

});

const PORT = process.env.PORT || 3001
httpServer.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});
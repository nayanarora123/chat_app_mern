import dotenv from "dotenv";
dotenv.config();

import http from 'http';
import api from './api.js';
import { Server } from 'socket.io';
import listenSocketServer from "./sockets.js";
import { connectMongo } from './config/mongo.js';

const httpServer = http.createServer(api);
const socketServer = new Server(httpServer, {
    cors: {
        origin: process.env.ORIGIN_URL,
        method: ['GET', 'POST']
    }
});

async function startServer() {
    const PORT = process.env.PORT || 3001
    await connectMongo();
    httpServer.listen(PORT, () => {
        console.log(`Server started on ${PORT}`);
    });
    listenSocketServer(socketServer);
}

startServer();

export default api;
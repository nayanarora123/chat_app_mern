const onlineUsers = new Map();

function getKey(onlineUsers, socketId) {
    for (const [key, val] of onlineUsers.entries()) {
        if (val === socketId) return key;
    }
}

export default function listen(io) {
    
    io.on('connection', (socket) => {
    
        socket.on('addUser', (userId) => {
            onlineUsers.set(userId, socket.id);
            io.emit('getUsers', Array.from(onlineUsers))
        });
    
        socket.on("sendMessage", ({ senderId, receiverId, message, status }) => {
            const sendUserSocket = onlineUsers.get(receiverId);
            if (sendUserSocket) {
                socket.to(sendUserSocket).emit("getMessage", {
                    senderId,
                    message,
                    status
                });
            }
        });
    
        socket.on("deleteMessage", ({ messageId, status }) => {
            io.emit("filteredMessages", { messageId, status });
        })
    
        socket.on('disconnect', (reason) => {
            onlineUsers.delete(getKey(onlineUsers, socket.id));
            console.log(`Client ${socket.id} disconnected: ${reason}`);
            socket.broadcast.emit('getUsers', Array.from(onlineUsers));
        });
    
    });
}
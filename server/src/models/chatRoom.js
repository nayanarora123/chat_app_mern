import mongoose from 'mongoose';

const chatRoomSchema = mongoose.Schema(
    {
        members: []
    },
    {
        timeStamps: true
    }
)

const ChatRoom = mongoose.model('chatRoom', chatRoomSchema);

export default ChatRoom;
import mongoose from 'mongoose';

const schema = mongoose.Schema(
    {
        chatRoomId: String,
        sender: String,
        message: String,
    },
    { timestamps: true }
);

const ChatMessage = mongoose.model('chatMessage', schema);

export default ChatMessage;
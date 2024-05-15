import mongoose from 'mongoose';

const schema = mongoose.Schema(
    {
        chatRoomId: String,
        sender: String,
        message: String,
        status: {
            type: Number,
            min: 0,
            max: 2
        }
    },
    { timestamps: true }
);

const ChatMessage = mongoose.model('chatMessage', schema);

export default ChatMessage;
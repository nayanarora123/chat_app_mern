import mongoose from 'mongoose';

const schema = mongoose.Schema(
    {
        members: []
    },
    {
        timeStamps: true
    }
)

const ChatRoom = mongoose.model('chatRoom', schema);

export default ChatRoom;
import ChatRoom from "../../models/chatRoom.js";

export async function createChatRoom(req, res) {
    const body = { members: [req.body.senderId, req.body.receiverId] };
    const options = { upsert: true, new: true };
    
    try {
        const newChatRoom = await ChatRoom.findOneAndUpdate(body, body, options);
        return res.status(201).json(newChatRoom)
    } catch (error) {
        return res.status(500).json({
            error: `error saving chatroom: ${error.message}`
        });
    }
}


export async function getChatRoomOfUser(req, res) {
    try {
        const chatRoom = await ChatRoom.find({
            members: { $in: [req.params.userId] },
        });
        return res.status(200).json(chatRoom);
    } catch (error) {
        return res.status(404).json({
            error: `Not found any document: ${error.message}`
        });
    }
}
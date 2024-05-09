import ChatMessage from "../../models/chatMessage.js";


export const createMessage = async (req, res) => {
    const newChatMessage = new ChatMessage(req.body);

    try {
        await newChatMessage.save();
        return res.status(201).json(newChatMessage);
    } catch (error) {
        return res.status(409).json({
            message: error.message,
        });
    }
}

export const getMessages = async (req, res) => {
    try {
        const messages = await ChatMessage.find({
            chatRoomId: req.params.chatRoomId,
        });
        return res.status(200).json(messages);
    } catch (error) {
        return res.status(409).json({
            message: error.message,
        });
    }
};

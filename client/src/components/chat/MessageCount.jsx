import React, { useEffect, useState } from "react";
import { getMessagesOfChatRoom } from "../../services/chatService";

export default function MessageCount({
    chatRoom,
    currentUser
}) {

    const [messageCount, setMessageCount] = useState(0);

    useEffect(() => {
        const fetchMessagesCount = async () => {
            const res = await getMessagesOfChatRoom(chatRoom._id)
            const recieverMessage = res.filter(message => message.sender !== currentUser.uid);
            setMessageCount(recieverMessage.length);
        }
        fetchMessagesCount();
    }, [chatRoom._id]);

    return (<>
        {messageCount !== 0 && <div className="message-count">{messageCount}</div>}
    </>);
}
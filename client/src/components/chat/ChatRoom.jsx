import React, {
  useState,
  useEffect,
  useRef
} from "react";

import {
  getMessagesOfChatRoom,
  sendMessage
} from "../../services/chatService";

import {
  STATUS_ACTIVE,
  STATUS_DELETE_FOR_EVERYONE,
  STATUS_DELETE_FOR_ME
} from '../../utils/Constants';

import Contact from "./Contact";
import ChatForm from "./ChatForm";
import Message from "./Message";

export default function ChatRoom({
  currentChat,
  currentUser,
  onlineUsersId,
  socket
}) {

  const [messages, setMessages] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState(null);

  const scrollRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMessagesOfChatRoom(currentChat._id);
      setMessages(res);
    };

    fetchData();
  }, [currentChat._id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    socket.current?.on("getMessage", (data) => {
      setIncomingMessage({
        senderId: data.senderId,
        message: data.message,
        status: data.status
      });
    });
  }, []);

  useEffect(() => {
    incomingMessage && setMessages((prev) => [...prev, incomingMessage]);
  }, [incomingMessage]);

  const handleFormSubmit = async (message) => {
    const receiverId = currentChat.members.find(
      (member) => member !== currentUser.uid
    );

    socket.current.emit("sendMessage", {
      senderId: currentUser.uid,
      receiverId: receiverId,
      message: message,
      status: STATUS_ACTIVE,
    });

    const messageBody = {
      chatRoomId: currentChat._id,
      sender: currentUser.uid,
      message: message,
      status: STATUS_ACTIVE,
    };
    const res = await sendMessage(messageBody);
    setMessages([...messages, res]);
  };

  return (
    <div className="lg:col-span-2 lg:block">
      <div className="w-full">
        <div className="p-3 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          <Contact
            currentUser={currentUser}
            chatRoom={currentChat}
            onlineUsersId={onlineUsersId}
          />
        </div>

        <div className="relative w-full p-6 h-80 overflow-y-auto h-[30rem] bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          <ul className="space-y-2">
            {messages?.filter(message =>
              message.status !== STATUS_DELETE_FOR_EVERYONE &&
              (message.sender !== currentUser.uid || message.status !== STATUS_DELETE_FOR_ME)
            ).map((message, index) => {
              return <div key={index} ref={scrollRef} >
                <Message message={message} self={currentUser.uid} socket={socket} setMessages={setMessages} />
              </div>
            })}
          </ul>
        </div>

        <ChatForm handleFormSubmit={handleFormSubmit} />
      </div>
    </div>
  );
}

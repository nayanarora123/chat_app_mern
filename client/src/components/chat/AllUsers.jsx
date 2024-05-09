import React, { useEffect, useState } from "react";
import Contact from "./Contact";
import UserLayout from "../layout/UserLayout";
import { createChatRoom } from "../../services/chatService";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AllUsers({
  users,
  currentUser,
  chatRooms,
  handleChat,
  onlineUsersId,
  setChatRooms
}) {

  const [selectedChat, setSelectedChat] = useState();

  const [nonContacts, setNonContacts] = useState([]);
  const [contactIds, setContactIds] = useState([]);

  useEffect(() => {
    const ids = chatRooms.map(chatRoom => {
      return chatRoom.members.find(member => member !== currentUser.uid);
    })
    setContactIds(ids);
  }, [chatRooms, currentUser.uid]);

  useEffect(() => {
    setNonContacts(
      users.filter(u => u.uid !== currentUser.uid && !contactIds.includes(u.uid))
    )
  }, [contactIds, users, currentUser.uid]);

  const changeCurrentChat = (index, chat) => {
    setSelectedChat(index);
    handleChat(chat)
  }

  const handleNewChatRoom = async (user) => {
    const members = {
      senderId: currentUser.uid,
      receiverId: user.uid
    };
    const res = await createChatRoom(members);
    setChatRooms(prev => [...prev, res]);
    handleChat(res);
  }

  return (
    <>
      <ul className="overflow-auto h-[30rem] h-full">
        <h2 className="my-2 mb-2 ml-2 text-gray-900 dark:text-white">Chats</h2>
        <li>
          {chatRooms.map((chatRoom, index) => (
            <div
              key={index}
              className={
                classNames(
                  index === selectedChat ?
                    "bg-gray-100 dark:bg-gray-700"
                    : "transition duration-150 ease-in-out cursor-pointer bg-white border-b border-gray-200 hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-700",
                  "flex items-center px-3 py-2 text-sm "
                )
              }
              onClick={() => changeCurrentChat(index, chatRoom)}
            >
              <Contact
                chatRoom={chatRoom}
                onlineUsersId={onlineUsersId}
                currentUser={currentUser}
              />
            </div>
          ))}
        </li>
        <h2 className="my-2 mb-2 ml-2 text-gray-900 dark:text-white">
          Other Users
        </h2>
        <li>
          {nonContacts.map((nonContact, index) => (
            <div
              key={index}
              className="flex items-center px-3 py-2 text-sm bg-white border-b border-gray-200 hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => handleNewChatRoom(nonContact)}
            >
              <UserLayout
                user={nonContact}
                onlineUsersId={onlineUsersId}
              />
            </div>
          ))}
        </li>
      </ul>
    </>
  );
}

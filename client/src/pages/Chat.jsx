import React, { useEffect, useRef, useState } from "react";
import SearchUsers from "../components/chat/SearchUsers";
import AllUsers from "../components/chat/AllUsers";
import ChatRoom from "../components/chat/ChatRoom";
import { useAuth } from "../contexts/AuthContext";
import { initiateSocketConection, getAllUsers } from "../services/chatService";
import Welcome from "../components/chat/Welcome";

export default function Chat() {

  const [users, setUsers] = useState([]);

  const { currentUser } = useAuth();
  const socket = useRef();

  useEffect(() => {
    const getSocket = async () => {
      const connect = await initiateSocketConection();
      socket.current = connect;
    }

    getSocket();
  }, [currentUser.uid])

  useEffect(() => {
    const fetchData = async () => {
      const users = await getAllUsers();
      setUsers(users);
    }

    fetchData();
  }, [])
  

  return (
    <>
      <div className="container mx-auto h-full">
        <div className="h-full min-w-full bg-white border-x border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 rounded lg:grid lg:grid-cols-3">
          <div className="h-full bg-white border-r border-gray-200 dark:bg-gray-900 dark:border-gray-700 lg:col-span-1">
            <SearchUsers />
            <AllUsers 
              users={users}
              currentUser={currentUser}
            />
          </div>

          {/* {currentChat ? ( */}
            <ChatRoom
              // currentChat={currentChat}
              // currentUser={currentUser}
              // socket={socket}
            />
          {/* ) : ( */}
            {/* <Welcome /> */}
          {/* )} */}


        </div>
      </div>
    </>
  );
};
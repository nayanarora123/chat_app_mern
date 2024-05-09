import React, {
  useEffect,
  useRef,
  useState
} from "react";
import {
  initiateSocketConection,
  getAllUsers,
  getChatRooms
} from "../services/chatService";
import SearchUsers from "../components/chat/SearchUsers";
import AllUsers from "../components/chat/AllUsers";
import ChatRoom from "../components/chat/ChatRoom";
import Welcome from "../components/chat/Welcome";
import { useAuth } from "../contexts/AuthContext";

export default function Chat() {

  const [users, setUsers] = useState([]);
  const [onlineUsersId, setOnlineUsersId] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [chatRooms, setChatRooms] = useState([]);
  const [filteredChatRooms, setFilteredChatRooms] = useState([]);

  const [searchQuery, setSearchQuery] = useState();
  const [currentChat, setCurrentChat] = useState();
  const [isContact, setIsContact] = useState();

  const { currentUser, setProfile } = useAuth();
  const socket = useRef();

  useEffect(() => {
    const getSocket = async () => {
      const connect = await initiateSocketConection();
      socket.current = connect;
      socket.current.emit('addUser', currentUser.uid);
      socket.current.on('getUsers', (onlineUsers) => {
        const usersId = onlineUsers.map(u => u[0]);
        setOnlineUsersId(usersId);
      });
    }

    getSocket();
    setProfile(currentUser.photoURL);
  }, [currentUser.uid])

  useEffect(() => {
    const fetchData = async () => {
      const users = await getAllUsers();
      setUsers(users);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const chatRooms = await getChatRooms(currentUser.uid);
      setChatRooms(chatRooms);
    };

    fetchData();
  }, [currentUser.uid]);

  useEffect(() => {
    setFilteredUsers(users);
    setFilteredChatRooms(chatRooms);
  }, [chatRooms, users])

  useEffect(() => {
    if (isContact) {
      setFilteredUsers([]);
    } else {
      setFilteredChatRooms([]);
    }
  }, [isContact]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  }

  const handleChange = (query) => {
    setSearchQuery(query);

    const searchedUsers = users.filter(user => {
      return user.displayName?.toLowerCase().includes(query.toLowerCase());
    });

    const searchedUsersId = searchedUsers.map(u => u.uid);

    // If there are initial contacts
    if (chatRooms.length !== 0) {
      chatRooms.forEach((chatRoom) => {

        // Check if searched user is a contact or not.
        const isUserContact = chatRoom.members.some(
          (e) => e !== currentUser.uid && searchedUsersId.includes(e)
        );

        setIsContact(isUserContact);
        console.log(isUserContact);

        isUserContact
          ? setFilteredChatRooms([chatRoom])
          : setFilteredUsers(searchedUsers);
      });
    } else {
      setFilteredUsers(searchedUsers);
    }

  }


  return (
    <>
      <div className="containe mx-auto h-full">
        <div className="h-full min-w-full bg-white border-x border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 rounded lg:grid lg:grid-cols-3">
          <div className="h-full bg-white border-r border-gray-200 dark:bg-gray-900 dark:border-gray-700 lg:col-span-1">
            <SearchUsers
              handleSearch={handleChange}
            />
            <AllUsers
              users={searchQuery === "" ? users : filteredUsers}
              chatRooms={searchQuery === "" ? chatRooms : filteredChatRooms}
              currentUser={currentUser}
              onlineUsersId={onlineUsersId}
              setChatRooms={setChatRooms}
              handleChat={handleChatChange}
            />
          </div>

          {currentChat ? (
            <ChatRoom
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
              onlineUsersId={onlineUsersId}
            />
          ) : (
            <Welcome />
          )}


        </div>
      </div>
    </>
  );
};
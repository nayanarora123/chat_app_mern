import React from "react";
import Contact from "./Contact";
import ChatForm from "./ChatForm";
import Message from "./Message";

export default function ChatRoom({
  currentChat,
  currentUser,
  onlineUsersId,
  socket
}) {

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
            {/* {messages.map((message, index) => ( */}
            <div
            //   key={index} ref={scrollRef}
            >
              <Message />
            </div>
            {/* ))} */}
          </ul>
        </div>

        <ChatForm
        // handleFormSubmit={handleFormSubmit}
        />
      </div>
    </div>
  );
}
